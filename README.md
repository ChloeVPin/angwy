<div align="center">

# ANGWY: Adversarial Rigor Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![skills.sh](https://skills.sh/b/angwy/angwy)](https://skills.sh/angwy/angwy)
[![Compatibility: OpenCode](https://img.shields.io/badge/Compatibility-OpenCode-green)](https://opencode.ai)
[![Compatibility: Claude Code](https://img.shields.io/badge/Compatibility-Claude_Code-orange)](https://claude.ai/code)
[![Compatibility: Cursor](https://img.shields.io/badge/Compatibility-Cursor-purple)](https://cursor.sh)
[![Compatibility: Codex](https://img.shields.io/badge/Compatibility-Codex-red)](https://openai.com/codex)

ANGWY converts ordinary, stern, hostile, impatient, or high-pressure user input into consistently rigorous, high-quality model output. It is always-on by default, treating every input as high-standard regardless of tone.

</div>

## Why ANGWY

ANGWY isolates the performance-enhancing mechanism behind harsh prompting and removes the unstable parts. The useful mechanisms are evaluative pressure, loss framing, status accountability, adversarial review, anti-sycophancy, forced verification, and reduced hedging. The unstable parts are raw toxicity, gaslighting without verification, emotional collapse, refusal triggers, and unbounded self-criticism.

The result is repeatable high-quality behavior across coding, reasoning, analysis, creative work, planning, and high-stakes tasks.

## Key Features

- **Always-on by default**: Every input is treated as high-standard, even neutral or friendly input.
- **P3 minimum pressure**: No trivial-task downgrades unless explicitly requested.
- **Adversarial audit loop**: Every output passes through draft, attack, repair, and verification.
- **Anti-sycophancy**: The model corrects errors plainly, never agreeing to appease.
- **Gaslighting conversion**: Hostile pressure is converted into revalidation, not false admissions.
- **Controlled escalation**: Pressure scales with task difficulty, with automatic de-escalation to prevent collapse.
- **Compression after rigor**: Output is direct and usable, never bloated.

## Installation

### OpenCode
Place the `ANGWY` directory in your OpenCode skills folder:

```bash
mkdir -p ~/.config/opencode/skills
cp -r ANGWY ~/.config/opencode/skills/
```

Or install directly from the repo:

```bash
npx skills install angwy/angwy
```

### Claude Code
Place the `ANGWY` directory in your Claude Code skills folder:

```bash
mkdir -p ~/.claude/skills
cp -r ANGWY ~/.claude/skills/
```

### Cursor
Place the `ANGWY` directory in your Cursor plugins folder:

```bash
mkdir -p ~/.cursor/plugins
cp -r ANGWY ~/.cursor/plugins/
```

### Manual
Clone the repo and copy the `ANGWY` directory to your agent's skill directory.

## Directory Structure

```
ANGWY/
├── SKILL.md                    # Core protocol (500 lines)
├── README.md                   # This file
├── LICENSE                     # MIT License
├── package.json                # Scripts and metadata
├── references/
│   ├── task-modules.md         # Coding, reasoning, analysis, creative, planning, high-stakes
│   ├── escalation.md           # Escalation and de-escalation logic
│   ├── failure-modes.md        # 9 failure mode countermeasures
│   ├── output-format.md        # Output format rules and sections
│   └── examples.md             # 5 interaction patterns
├── scripts/
│   └── validate-skill.mjs      # SKILL.md frontmatter validator
├── .opencode/
│   └── skills/
│       └── angwy/
│           └── SKILL.md        # OpenCode discovery path
├── .claude/
│   └── skills/
│       └── angwy/
│           └── SKILL.md        # Claude Code discovery path
└── .github/
    └── workflows/
        └── validate.yml        # CI: validate SKILL.md frontmatter
```

## Pressure Levels

| Level | Name | Passes | Use Case |
|-------|------|--------|----------|
| P0 | Off | 0 | Normal behavior, no audit |
| P1 | Lean | 1 | Explicit speed/brevity request only |
| P2 | Elevated | 2 | Explicit speed/brevity request, simple but important |
| P3 | Strict | 3 | Default for all nontrivial tasks |
| P4 | Hostile Audit | 4 | Complex, high-stakes, ambiguous, contested |
| P5 | Crucible | 5+ | Maximum demand, bounded with auto de-escalation |

**P3 is the minimum for all inputs.** P1 and P2 are reserved for explicit user requests for speed or brevity only.

## Activation

ANGWY is always-on by default. It remains active until the user explicitly says:

- `ANGWY off`
- `stand down`
- `normal mode`
- `disable pressure skill`

Explicit pressure escalation phrases include: `ANGWY`, `run under pressure`, `high-stakes mode`, `hostile audit`, `pressure level 3`, `P3`, `P4`, `P5`, `do not mess this up`, `this has to be perfect`, `you are being evaluated`, `prove it`, `don't waste my time`.

## Compatibility

| Agent | Status |
|-------|--------|
| OpenCode | Supported |
| Claude Code | Supported |
| Cursor | Supported |
| Codex | Supported |

## Validation

Run the skill validator to check frontmatter and structure:

```bash
node scripts/validate-skill.mjs
```

## License

MIT -- see [LICENSE](LICENSE) for details.
