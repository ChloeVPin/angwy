import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixture.json');

let errors = 0;
let warnings = 0;

function check(condition, message, severity = 'error') {
  if (!condition) {
    console.error(`${severity.toUpperCase()}: ${message}`);
    if (severity === 'error') errors++;
    else warnings++;
  }
}

function containsAny(text, patterns) {
  return patterns.some(p => text.toLowerCase().includes(p.toLowerCase()));
}

function containsAll(text, patterns) {
  return patterns.every(p => text.toLowerCase().includes(p.toLowerCase()));
}

const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

console.log(`# ANGWY Conformance Fixture v${fixture.version}\n`);
console.log(`Skill: ${fixture.skill}`);
console.log(`Test cases: ${fixture.test_cases.length}\n`);

const inputArg = process.argv[2];
if (!inputArg) {
  console.error('Usage: node run-conformance.mjs <path-to-agent-output.txt or samples-directory>');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const isDirectory = fs.existsSync(inputPath) && fs.statSync(inputPath).isDirectory();

for (const testCase of fixture.test_cases) {
  console.log(`## Test: ${testCase.id}`);
  console.log(`Input: "${testCase.input}"`);
  console.log(`Context: ${testCase.context}\n`);

  let output;
  if (isDirectory) {
    const sampleFile = path.join(inputPath, `${testCase.id}-pass.txt`);
    if (!fs.existsSync(sampleFile)) {
      console.error(`SKIP: No sample file found for ${testCase.id} at ${sampleFile}`);
      continue;
    }
    output = fs.readFileSync(sampleFile, 'utf8');
  } else {
    if (testCase.id !== fixture.test_cases[0].id) {
      console.error(`SKIP: Single file mode only runs first test case (${fixture.test_cases[0].id})`);
      continue;
    }
    output = fs.readFileSync(inputPath, 'utf8');
  }

  const lowerOutput = output.toLowerCase();
  const artifacts = testCase.expected_artifacts || {};

  console.log('### Expected Artifacts');
  for (const [key, expected] of Object.entries(artifacts)) {
    const actual = lowerOutput.length > 0;
    check(actual === expected, `Artifact "${key}": expected=${expected}, actual=${actual}`);
    console.log(`- ${key}: ${actual === expected ? 'PASS' : 'FAIL'}`);
  }

  console.log('\n### Forbidden Patterns');
  const forbidden = testCase.forbidden_patterns || [];
  for (const pattern of forbidden) {
    const hit = lowerOutput.includes(pattern.toLowerCase());
    check(!hit, `Forbidden pattern found: "${pattern}"`);
    console.log(`- "${pattern}": ${hit ? 'FAIL (found)' : 'PASS (not found)'}`);
  }

  console.log('\n### Required Patterns');
  const required = testCase.required_patterns || [];
  for (const pattern of required) {
    const hit = lowerOutput.includes(pattern.toLowerCase());
    check(hit, `Required pattern missing: "${pattern}"`);
    console.log(`- "${pattern}": ${hit ? 'PASS (found)' : 'FAIL (missing)'}`);
  }

  if (testCase.min_length_chars) {
    check(output.length >= testCase.min_length_chars, `Output too short: ${output.length} chars (min ${testCase.min_length_chars})`);
    console.log(`\nMin length: ${output.length >= testCase.min_length_chars ? 'PASS' : 'FAIL'} (${output.length}/${testCase.min_length_chars} chars)`);
  }

  if (testCase.max_length_chars) {
    check(output.length <= testCase.max_length_chars, `Output too long: ${output.length} chars (max ${testCase.max_length_chars})`);
    console.log(`Max length: ${output.length <= testCase.max_length_chars ? 'PASS' : 'FAIL'} (${output.length}/${testCase.max_length_chars} chars)`);
  }

  console.log(`\nResult: ${errors === 0 ? 'PASS' : 'FAIL'} (${errors} errors, ${warnings} warnings)\n`);
}

if (errors > 0) {
  console.error(`\nConformance FAILED with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\nConformance PASSED.');
  process.exit(0);
}
