require("../src/data/sizeReference.js");
require("../src/calculations/core.js");
require("../calculator-engine.js");
require("./calculator-engine.test.js");
const report = global.YarnchaCalculatorEngineTests.run(global.YarnchaCalculatorEngine);
console.log(JSON.stringify(report, null, 2));
if (report.failures.length) process.exitCode = 1;
