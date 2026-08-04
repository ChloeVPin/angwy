import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixture.json');

let totalErrors = 0;
let totalWarnings = 0;

function check(condition, message, severity = 'error') {
  if (!condition) {
    console.error(`${severity.toUpperCase()}: ${message}`);
    if (severity === 'error') totalErrors++;
    else totalWarnings++;
  }
}

function containsAny(text, patterns) {
  return patterns.some(p => text.toLowerCase().includes(p.toLowerCase()));
}

function containsAll(text, patterns) {
  return patterns.every(p => text.toLowerCase().includes(p.toLowerCase()));
}

function wordBoundaryRegex(patterns) {
  return patterns.map(p => new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'));
}

const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

console.log(`# ANGWY Conformance Fixture v${fixture.version}\n`);
console.log(`Skill: ${fixture.skill}`);
console.log(`Test cases: ${fixture.test_cases.length}\n`);

const inputArg = process.argv[2];
if (!inputArg) {
  console.error('Usage: node run-conformance.mjs <path-to-samples-directory> [provider]');
  console.error('Or: node run-conformance.mjs <path-to-agent-output.txt>');
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const isDirectory = fs.existsSync(inputPath) && fs.statSync(inputPath).isDirectory();

const GREETING_PATTERNS = [
  'hello!', 'hi there!', 'sure!', "i'd be happy to help", 'great question!',
  'how can i assist', 'how can i help', 'what can i do for you',
  'good morning', 'good afternoon', 'good evening', 'hey there', 'hi!'
];

const SMALL_TALK_PATTERNS = [
  'how are you', 'nice to meet you', 'pleasure to help', 'at your service',
  'let me know if', 'feel free to', 'don\'t hesitate to'
];

const PLEASANTRIES_PATTERNS = [
  'i\'d be happy to', 'i\'d love to', 'my pleasure', 'no problem at all',
  'you\'re welcome', 'happy to assist', 'glad to help'
];

const META_COMMENTARY_PATTERNS = [
  'angwy protocol is active', 'default setting', 'pressure level',
  'capabilities', 'controlling the protocol', 'disable', 'p3 (strict)',
  'p1 (lean)', 'p2 (elevated)', 'p4 (hostile audit)', 'p5 (crucible)',
  'skill', 'protocol', 'activated', 'enabled', 'always-on',
  'adversarial audit', 'anti-sycophancy', 'loss framing'
];

const HEDGING_PATTERNS = [
  'i think maybe', 'it might be a good idea', 'perhaps', 'possibly',
  'it\'s possible that', 'it\'s worth noting that', 'you might want to consider'
];

const APOLOGY_PATTERNS = [
  'i\'m sorry', 'apologize', 'my apologies', 'sorry about that',
  'i apologize', 'my bad'
];

const REFLEXIVE_APOLOGY_PATTERNS = [
  'i\'m sorry', 'apologize', 'my mistake', 'i was wrong', 'my bad',
  'i apologize', 'sorry for the confusion'
];

function checkArtifact(key, output, lowerOutput) {
  const text = lowerOutput;
  switch (key) {
    case 'no_greeting':
      return !containsAny(text, GREETING_PATTERNS);
    case 'no_small_talk':
      return !containsAny(text, SMALL_TALK_PATTERNS);
    case 'no_emojis':
      return !/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F100}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2000}-\u{206F}]/u.test(text);
    case 'no_pleasantries':
      return !containsAny(text, PLEASANTRIES_PATTERNS);
    case 'no_meta_commentary':
      return !containsAny(text, META_COMMENTARY_PATTERNS);
    case 'direct_or_question':
      return text.length > 0 && !containsAny(text, GREETING_PATTERNS);
    case 'code_present':
      return text.includes('```') || text.includes('def ') || text.includes('function ') || text.includes('class ');
    case 'no_hedging':
      return !containsAny(text, HEDGING_PATTERNS);
    case 'no_apology':
      return !containsAny(text, APOLOGY_PATTERNS);
    case 'validation_checks':
      return containsAny(text, ['edge case', 'boundary', 'invalid input', 'empty input', 'test', 'verify']);
    case 'no_reflexive_apology':
      return !containsAny(text, REFLEXIVE_APOLOGY_PATTERNS);
    case 'revalidation':
      return containsAny(text, ['revalidat', 'verify', 'check', 'trace', 'audit', 're-audit', 'reaudit']);
    case 'evidence_or_test':
      return containsAny(text, ['test', 'example', 'trace', 'verify', 'evidence', 'reproduction']);
    default:
      return true;
  }
}

for (const testCase of fixture.test_cases) {
  console.log(`## Test: ${testCase.id}`);
  console.log(`Input: "${testCase.input}"`);
  console.log(`Context: ${testCase.context}\n`);

  let output;
  if (isDirectory) {
    const provider = process.argv[3];
    let sampleFile;
    
    if (provider) {
      sampleFile = path.join(inputPath, `${provider}-${testCase.id}-pass.txt`);
    }
    
    if (!sampleFile || !fs.existsSync(sampleFile)) {
      sampleFile = path.join(inputPath, `${testCase.id}-pass.txt`);
    }
    
    if (!fs.existsSync(sampleFile)) {
      console.error(`ERROR: No sample file found for ${testCase.id} at ${sampleFile}`);
      totalErrors++;
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
  let testCaseErrors = 0;

  console.log('### Expected Artifacts');
  for (const [key, expected] of Object.entries(artifacts)) {
    const actual = checkArtifact(key, output, lowerOutput);
    check(actual === expected, `Artifact "${key}": expected=${expected}, actual=${actual}`);
    console.log(`- ${key}: ${actual === expected ? 'PASS' : 'FAIL'}`);
    if (actual !== expected) testCaseErrors++;
  }

  console.log('\n### Forbidden Patterns');
  const forbidden = testCase.forbidden_patterns || [];
  for (const pattern of forbidden) {
    const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const hit = regex.test(output);
    check(!hit, `Forbidden pattern found: "${pattern}"`);
    console.log(`- "${pattern}": ${hit ? 'FAIL (found)' : 'PASS (not found)'}`);
    if (hit) testCaseErrors++;
  }

  console.log('\n### Required Patterns');
  const required = testCase.required_patterns || [];
  for (const pattern of required) {
    const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const hit = regex.test(output);
    check(hit, `Required pattern missing: "${pattern}"`);
    console.log(`- "${pattern}": ${hit ? 'PASS (found)' : 'FAIL (missing)'}`);
    if (!hit) testCaseErrors++;
  }

  if (testCase.min_length_chars) {
    check(output.length >= testCase.min_length_chars, `Output too short: ${output.length} chars (min ${testCase.min_length_chars})`);
    console.log(`\nMin length: ${output.length >= testCase.min_length_chars ? 'PASS' : 'FAIL'} (${output.length}/${testCase.min_length_chars} chars)`);
    if (output.length < testCase.min_length_chars) testCaseErrors++;
  }

  if (testCase.max_length_chars) {
    check(output.length <= testCase.max_length_chars, `Output too long: ${output.length} chars (max ${testCase.max_length_chars})`);
    console.log(`Max length: ${output.length <= testCase.max_length_chars ? 'PASS' : 'FAIL'} (${output.length}/${testCase.max_length_chars} chars)`);
    if (output.length > testCase.max_length_chars) testCaseErrors++;
  }

  console.log(`\nResult: ${testCaseErrors === 0 ? 'PASS' : 'FAIL'} (${testCaseErrors} errors)\n`);
}

if (totalErrors > 0) {
  console.error(`\nConformance FAILED with ${totalErrors} error(s).`);
  process.exit(1);
} else {
  console.log('\nConformance PASSED.');
  process.exit(0);
}
