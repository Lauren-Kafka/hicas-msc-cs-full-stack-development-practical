#!/usr/bin/env node
import { execSync, spawn } from "child_process";
import fs from "fs";

const repo = "https://github.com/Lauren-Kafka/hicas-msc-cs-full-stack-development-practical.git";
const cmd = process.argv[2];
const program = process.argv[3] || cmd;

if (!cmd) {
  console.log("Usage:");
  console.log("npx hicas-msc-cs-fsd program1");
  console.log("npx hicas-msc-cs-fsd run program1");
  process.exit(0);
}

if (cmd === "list") {
  console.log("Available programs:");
  console.log("- program1");
  console.log("- program9");
  process.exit(0);
}

if (cmd === "run") {
  if (!fs.existsSync(program)) {
    console.error(`Error: Directory "${program}" not found.`);
    console.error(`Did you download it first?`);
    console.error(`Run this command: npx hicas-msc-cs-fsd ${program}`);
    process.exit(1);
  }

  let server;
  let client;

  if (fs.existsSync(`${program}/server`)) {
    console.log("Installing Server dependencies...");
    if (!fs.existsSync(`${program}/server/node_modules`)) {
      execSync("npm install", { cwd: `${program}/server`, stdio: "inherit" });
    }
    server = spawn("npm", ["run", "dev"], { cwd: `${program}/server`, stdio: "inherit", shell: true });
  }

  if (fs.existsSync(`${program}/client`)) {
    console.log("Installing Client dependencies...");
    if (!fs.existsSync(`${program}/client/node_modules`)) {
      execSync("npm install", { cwd: `${program}/client`, stdio: "inherit" });
    }
    client = spawn("npm", ["run", "dev"], { cwd: `${program}/client`, stdio: "inherit", shell: true });
  }

  // Keep alive
  process.stdin.resume();
} else {
  // Download logic
  execSync(
    `git clone -b ${cmd} --single-branch ${repo} ${cmd}`,
    { stdio: "inherit" }
  );
}
