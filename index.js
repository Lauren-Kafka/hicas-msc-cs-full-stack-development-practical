#!/usr/bin/env node
import { execSync, spawn } from "child_process";
import fs from "fs";

const repo = "https://github.com/Lauren-u4t/hicas-msc-cs-full-stack-development-practical.git";
const cmd = process.argv[2];
const program = process.argv[3] || cmd;

if (!cmd) {
  console.log("Usage:");
  console.log("npx hicas-msc-cs-fsd program1");
  console.log("npx hicas-msc-cs-fsd run program1");
  process.exit(0);
}

if (cmd === "run") {
  if (!fs.existsSync(program)) {
    console.error("Program not found");
    process.exit(1);
  }

  spawn("npm", ["run", "dev"], { cwd: `${program}/server`, stdio: "inherit", shell: true });
  spawn("npm", ["run", "dev"], { cwd: `${program}/client`, stdio: "inherit", shell: true });
  return;
}

execSync(
  `git clone -b ${cmd} --single-branch ${repo} ${cmd}`,
  { stdio: "inherit" }
);
