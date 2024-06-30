import { reduxSetup, tailwindSetup } from "../utils/data/index.js";
import installPackage from "../utils/services/installPackage.js";
import questions from "../utils/services/questions.js";
import addSetupFileIntoProject from "../utils/services/setFilesInProject.js";
import { AnswerChoices, AnswerEnum } from "../utils/types/services.js";

const setup = async () => {
  try {
    const answers = await questions();

    let isTs = false;
    let isSrc = false;
    let isNextJs = false;

    // Determine TypeScript, src, and Next.js settings
    if (answers[AnswerEnum.ts] === AnswerChoices.Yes) isTs = true;
    if (answers[AnswerEnum.src]) isSrc = true;
    if (answers[AnswerEnum.nextjs] === AnswerChoices.Yes) isNextJs = true;

    // Setup Tailwind CSS
    if (answers[AnswerEnum.tw] === AnswerChoices.Yes) {
      for (const p of tailwindSetup) {
        await installPackage({ packageName: p });
      }
      await addSetupFileIntoProject({ isSrc, isTs, setupName: AnswerEnum.tw, isNextJs });
    }

    // Setup Redux Toolkit
    if (answers[AnswerEnum.redux] === AnswerChoices.Yes) {
      await installPackage({ packageName: reduxSetup });
      await addSetupFileIntoProject({ isSrc, isTs, setupName: AnswerEnum.redux });
    }

    // Setup Context API
    if (answers[AnswerEnum.context] === AnswerChoices.Yes) {
      await addSetupFileIntoProject({ isSrc, isTs, setupName: AnswerEnum.context });
    }

  } catch (error) {
    console.error("Setup error:", error);
  }
};

export { setup };
