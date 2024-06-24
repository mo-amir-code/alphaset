#!/usr/bin/env node

import { setup } from "./scripts/setup.js";

const main = async () => {
  await setup();
};

main();
