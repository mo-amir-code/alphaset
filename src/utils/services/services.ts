import * as path from "path";
import * as fs from "fs";
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

const moveFile = ({source, destination}:{source:string, destination:string}) => {
  fs.rename(source, destination, (err) => {
    if (err) {
      console.error('Error moving file:', err);
    } else {
      console.log(`File moved from ${source} to ${destination}`);
    }
  });
};

const deleteFolderWithFiles = (folderPath:string) => {
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

export { rootDir, moveFile, deleteFolderWithFiles };
