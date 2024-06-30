import * as path from "path";
import * as fs from "fs";
import { FileTransportType } from "../types/services";
// import { fileURLToPath } from "url";

const findRootDirectory = () => {
  let currentDir = process.cwd();
  let rootDir:string = '';

  // Traverse up the directory tree until we find package.json
  while (true) {
    const packageJsonPath = path.join(currentDir, 'package.json');

    try {
      // Check if package.json exists in the current directory
      if (fs.existsSync(packageJsonPath)) {
        rootDir = currentDir;
        break;
      }
    } catch (error) {
      console.error('Error checking package.json:', error);
    }

    // Move up one directory level
    const parentDir = path.dirname(currentDir);
    // Break if we've reached the root or unable to go further up
    if (currentDir === parentDir) break;

    currentDir = parentDir;
  }

  return rootDir;
};

const moveFile = async ({source, destination}:FileTransportType) => {
  fs.rename(source, destination, (err) => {
    if (err) {
      console.error('Error moving file:', err);
    }
  });
};

const moveFileContent = async ({ source, destination }:FileTransportType) => {
  try {

    // Read the content of the source file
    const sourceContent = fs.readFileSync(source, 'utf-8');

    // Ensure the destination directory exists
    const destDir = path.dirname(destination);
    fs.mkdirSync(destDir, { recursive: true });

    // Read the content of the destination file if it exists
    let destContent = '';
    try {
      destContent = fs.readFileSync(destination, 'utf-8');
    } catch (err:any) {
      if (err.code !== 'ENOENT') throw err; // Ignore error if file does not exist
    }

    // Combine the source content and destination content
    const newContent = sourceContent + "\n\n" + destContent;

    // Write the combined content back to the destination file
    fs.writeFileSync(destination, newContent);

    // Optionally, delete the source file if you want to move (not copy) the content
    // fs.unlinkSync(source);
    await deleteFolderWithFiles(path.dirname(source));
  } catch (error) {
    console.error("Error occurred while moving content:", error);
  }
};
const deleteFolderWithFiles = async (folderPath:string) => {
  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error('Error deleting folder:', err);
    } else {
      console.log(`Folder ${folderPath} deleted successfully.`);
    }
  });
};

// Get current filename and dirname using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const rootDir = path.dirname(__dirname);

const rootDir = findRootDirectory();

export { rootDir, moveFile, deleteFolderWithFiles, moveFileContent };
