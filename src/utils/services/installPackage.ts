import { exec } from "child_process";

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

export default installPackage;