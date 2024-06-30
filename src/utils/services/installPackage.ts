import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

const installPackage = async ({
  packageName,
}: {
  packageName: string;
}): Promise<boolean> => {
  let isInstalled = true;

  const {stdout, stderr} = await execPromise(`npm install ${packageName}`);
  
  if (stderr) {
    console.error(`npm stderr: ${stderr}`);
    isInstalled = false;
  }

  return isInstalled;
};

export default installPackage;