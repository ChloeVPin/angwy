import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillPath = path.join(__dirname, '..', 'SKILL.md');

let errors = 0;

function check(condition, message) {
  if (!condition) {
    console.error('ERROR:', message);
    errors++;
  }
}

const content = fs.readFileSync(skillPath, 'utf8');

check(content.startsWith('---'), 'SKILL.md must start with YAML frontmatter (---)');

const frontmatterEnd = content.indexOf('---', 3);
check(frontmatterEnd !== -1, 'SKILL.md must have closing frontmatter delimiter (---)');

const frontmatter = content.slice(3, frontmatterEnd);

check(frontmatter.includes('name:'), 'Frontmatter must include "name"');
check(frontmatter.includes('description:'), 'Frontmatter must include "description"');

const nameMatch = frontmatter.match(/name:\s*(.+)/);
check(nameMatch, 'Frontmatter must have valid "name" field');
if (nameMatch) {
  const name = nameMatch[1].trim().replace(/['"]/g, '');
  check(name === name.toLowerCase(), 'Name must be lowercase');
  check(!name.includes(' '), 'Name must not contain spaces');
  check(!name.includes('_'), 'Name must not contain underscores');
}

const versionMatch = frontmatter.match(/version:\s*["']?(\d+\.\d+\.\d+)["']?/);
check(versionMatch, 'Frontmatter must have valid semver version (e.g., 1.0.0)');
if (versionMatch) {
  check(versionMatch[1].split('.').length === 3, 'Version must be semver (major.minor.patch)');
}

const dirName = path.basename(path.dirname(skillPath));
const expectedName = nameMatch?.[1]?.trim().replace(/['"]/g, '') || '';
check(dirName.toLowerCase() === expectedName.toLowerCase(), 'Directory name must match frontmatter name (case-insensitive)');

check(content.length < 50000, 'SKILL.md should be under 50KB');

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('SKILL.md validation passed.');
  process.exit(0);
}
