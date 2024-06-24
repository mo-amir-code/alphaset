import inquirer from "inquirer";
import { Answer, AnswerEnum } from "../types/services.js";
import { spawn } from "child_process";
import { SingleBar, Presets } from "cli-progress"

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

const installPackage = async ({ packageName }: { packageName:string }): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let isInstalled = true;
    let totalData = 0;
    const progressBar = new SingleBar({
      format: 'Installing [{bar}] {percentage}% | ETA: {eta}s',
      hideCursor: true
    }, Presets.shades_grey);

    progressBar.start(100, 0);

    try {
      const childProcess = spawn('npm', ['install', packageName], { shell: true });

      childProcess.stdout.on('data', (data) => {
        totalData += data.length;
        const progress = Math.min(1, totalData / 10000); // This is a simple estimation
        progressBar.update(progress * 100);
        console.log(`npm stdout: ${data.toString()}`);
      });

      childProcess.stderr.on('data', (data) => {
        console.error(`npm stderr: ${data.toString()}`);
        isInstalled = false;
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          progressBar.update(100); // Ensure the progress bar is full at the end
          progressBar.stop();
          console.log(`\n${packageName} installed successfully.`);
        } else {
          isInstalled = false;
          console.error(`\nnpm install process exited with code ${code}`);
        }
        resolve(isInstalled);
      });

      childProcess.on('error', (error) => {
        console.error(`\nnpm install process error: ${error}`);
        isInstalled = false;
        reject(error);
      });
    } catch (error:any) {
      console.error(`Error: ${error.message}`);
      reject(error);
    }
  });
};


export { questions, installPackage };
