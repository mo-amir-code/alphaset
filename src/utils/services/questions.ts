import inquirer from "inquirer";
import { Answer, AnswerEnum } from "../types/services.js";

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

  
  
  export default questions;