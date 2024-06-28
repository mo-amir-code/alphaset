import { reduxSetup, tailwindSetup } from "../utils/data/index.js";
import { addSetupFileIntoProject, installPackage, questions } from "../utils/services/services.js";
import { AnswerChoices, AnswerEnum } from "../utils/types/services.js";

const setup = async () => {
  try {
    const answers = await questions();

    let isTs = false;
    let isSrc = false;

    Object.entries(answers).forEach(async ([key, value]) => {
      switch (key as AnswerEnum) {
        case AnswerEnum.ts:
          isTs = true;
          break;
        case AnswerEnum.src:
          isSrc = true;
          break;
        case AnswerEnum.tw:
          if (value === AnswerChoices.Yes) {
            tailwindSetup.forEach(async (p: string) => {
              await installPackage({ packageName: p });
            });
            await addSetupFileIntoProject({isSrc, isTs, setupName:AnswerEnum.tw});
          }
          break;
        case AnswerEnum.redux:
          if (value === AnswerChoices.Yes) {
            await installPackage({ packageName: reduxSetup });
            await addSetupFileIntoProject({isSrc, isTs, setupName:AnswerEnum.redux});
          }
          break;
        case AnswerEnum.context:
          if(value === AnswerChoices.Yes){
            await addSetupFileIntoProject({isSrc, isTs, setupName:AnswerEnum.context});
          }
          break;
        default:
          console.error("Invalid choice error");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export { setup };