import { AddSetupFileIntoProjectTypes, AnswerEnum } from "../types/services.js";
import axios from "axios";
import * as path from "path";
import * as fs from "fs";
import * as unzipper from "unzipper";
import { rootDir } from "./services.js";

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

        if(setupName === AnswerEnum.tw){
          
        }
  
          console.log(`${setupName} setup have been set.......`);
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

  export default addSetupFileIntoProject;