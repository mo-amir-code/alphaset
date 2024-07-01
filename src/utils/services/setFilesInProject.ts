import { AddSetupFileIntoProjectTypes, AnswerEnum } from "../types/services.js";
import axios from "axios";
import * as path from "path";
import * as fs from "fs";
import * as unzipper from "unzipper";
import { moveFile, moveFileContent, rootDir } from "./services.js";

const addSetupFileIntoProject = async ({ isTs, isSrc, setupName, isNextJs }: AddSetupFileIntoProjectTypes) => {
  try {
    console.log(`${setupName} is setting up.......`);

    const queryParams = [];
    if (isTs) queryParams.push("isTs=true");
    if (isNextJs) queryParams.push("isNextJs=true");
    queryParams.push(`setupName=${setupName}`);

    const queryString = queryParams.join("&");
    const response = await axios.get(`https://hpqwtb00jh.execute-api.ap-south-1.amazonaws.com/setup?${queryString}`);

    console.log(`${setupName} is almost done.......`);

    if (response.status === 200) {
      const base64Data = response.data.body;
      const zipBuffer = Buffer.from(base64Data, 'base64');

      const zipFilePath = path.join(rootDir, `${isSrc ? "src/" : ""}${setupName}.zip`);
      fs.writeFileSync(zipFilePath, zipBuffer);

      await fs.createReadStream(zipFilePath).pipe(unzipper.Extract({ path: path.join(rootDir, isSrc ? "src" : "") })).promise();
      fs.unlinkSync(zipFilePath);

      if (setupName === AnswerEnum.tw) {
        const sourceBasePath = path.join(rootDir, isSrc ? "src/" : "", isNextJs ? "nextjs" : "reactjs");
        const destPath = path.join(rootDir, 'tailwind.config.js');
        
        await moveFile({ source: path.join(sourceBasePath, "tailwind.config.js"), destination: destPath });

        const sourceCssFile = path.join(sourceBasePath, isNextJs ? "global.css" : "index.css");
        const destCssFile = path.join(rootDir, `src/${isNextJs ? "app/globals.css" : "index.css"}`);

        await moveFileContent({ source: sourceCssFile, destination: destCssFile });
      }

      console.log(`${setupName} has been set.......`);
    } else {
      console.error('Failed to retrieve ZIP file:', response.status, response.data);
    }

  } catch (error) {
    console.error(`Error setting up ${setupName}:`, error);
  }
};

export default addSetupFileIntoProject;