import inquirer from "inquirer";
import { AddSetupFileIntoProjectTypes, Answer, AnswerEnum } from "../types/services.js";
import { exec } from "child_process";
import axios from "axios";

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

    const file = await axios.get("/api/path")

  } catch (error) {
    console.error(error);
  }
}


export { questions, installPackage, addSetupFileIntoProject };
