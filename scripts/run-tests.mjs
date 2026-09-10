import { readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const deferredProductionChecks = new Set([
  "production-artifact.test.mjs",
  "production-smoke.test.mjs",
  "pwa-contract.test.mjs"
]);
const tests = (await readdir(resolve("tests"), { withFileTypes: true }))
  .filter(entry => entry.isFile() && /\.test\.(?:js|mjs|cjs)$/.test(entry.name) && !deferredProductionChecks.has(entry.name))
  .map(entry => resolve("tests", entry.name))
  .sort();

if (!tests.length) throw new Error("No Yarncha tests were discovered.");
const child = spawn(process.execPath, ["--test", ...tests], { stdio: "inherit" });
child.on("error", error => { throw error; });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exitCode = code ?? 1;
});
