import inquirer from "inquirer";
import { AddSetupFileIntoProjectTypes, Answer, AnswerEnum } from "../types/services.js";
import { exec } from "child_process";
import axios from "axios";
import * as path from "path";
import * as fs from "fs";
import * as unzipper from "unzipper";
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

// Get current filename and dirname using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const rootDir = path.dirname(__dirname);

const rootDir = findRootDirectory();

const questions = async (): Promise<Answer | any> => {
  try {
    const answers: Answer = await inquirer.prompt([
      {
        type: "list",
        name: AnswerEnum.ts,
        message: "Are you using typescript",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: AnswerEnum.src,
        message: "Have you src directory",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: AnswerEnum.tw,
        message: "Would you like to install Tailwind CSS",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: AnswerEnum.redux,
        message: "Would you like to configure redux tool kit",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: AnswerEnum.context,
        message: "Would you like to configure context api",
        choices: ["Yes", "No"],
      },
    ]);

    return answers;
  } catch (error) {
    console.error(error);
  }
};

const installPackage = async ({
  packageName,
}: {
  packageName: string;
}): Promise<boolean> => {
  let isInstalled = true;

  const childProcess = exec(`npm install ${packageName}`);

  childProcess.stdout?.on("data", (data) => {
    console.log(`npm stdout: ${data}`);
    console.log(`${packageName} is installing.....`);
  });

  childProcess.stderr?.on("data", (data) => {
    console.error(`npm stderr: ${data}`);
    isInstalled = false;
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      console.log(`${packageName} installed successfully.`);
    } else {
      isInstalled = false;
      console.error(`npm install process exited with code ${code}`);
    }
  });

  return isInstalled;
};

const addSetupFileIntoProject = async ({isTs, isSrc, setupName}:AddSetupFileIntoProjectTypes) => {
  try {    

    console.log(`${setupName} setup is setting up.......`);
    const response = await axios.get(`https://hfz1qvmqrh.execute-api.us-east-1.amazonaws.com/setup?isTs=${isTs}&setupName=${setupName}`);
    
    console.log(`${setupName} setup is almost done.......`);

    if (response.status === 200) {
      const base64Data = response.data.body;
      const zipBuffer = Buffer.from(base64Data, 'base64');
      
      // Specify the path where you want to save the ZIP file
      const zipFilePath = path.join(rootDir, `${isSrc? "src/" : ""}${setupName}.zip`);

      // Write the ZIP buffer to a file
      fs.writeFileSync(zipFilePath, zipBuffer);

      // Unzip the downloaded file
      await fs
        .createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: path.join(rootDir, `${isSrc? "src" : ""}`) }))
        .promise();

        console.log(`${setupName} files have been set.......`);
    } else {
      console.error(
        'Failed to retrieve ZIP file:',
        response.status,
        response.data
      );
    }

  } catch (error) {
    console.error(error);
  }
}

export { questions, installPackage, addSetupFileIntoProject };
