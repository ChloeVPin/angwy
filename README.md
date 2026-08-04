<div align="center">

<img src="logo.webp" alt="ANGWY logo" width="128">

# ANGWY: Adversarial Rigor Protocol

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![skills.sh](https://skills.sh/b/angwy/angwy)](https://skills.sh/angwy/angwy)

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

### Via skills.sh Marketplace
Install directly using the skills CLI:

```bash
npx skills install angwy/angwy
```

### Manual
Clone the repo and copy the contents to your agent's skill directory:

```bash
git clone https://github.com/ChloeVPin/angwy.git
cp -r angwy/* ~/.config/opencode/skills/angwy/
```

## Directory Structure

```
.
├── SKILL.md                    # Core protocol (500 lines)
├── README.md                   # This file
├── LICENSE                     # Apache 2.0 License
├── package.json                # Scripts and metadata
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution guidelines
├── ROADMAP.md                  # Project roadmap
├── references/
│   ├── task-modules.md         # Coding, reasoning, analysis, creative, planning, high-stakes
│   ├── escalation.md           # Escalation and de-escalation logic
│   ├── failure-modes.md        # 9 failure mode countermeasures
│   ├── output-format.md        # Output format rules and sections
│   └── examples.md             # 5 interaction patterns
├── scripts/
│   ├── validate-skill.mjs      # SKILL.md frontmatter validator
│   └── run-conformance.mjs     # Conformance test runner
├── tests/
│   └── conformance/
│       ├── fixture.json        # Test cases, expected artifacts, forbidden patterns
│       └── samples/            # Reference outputs for each test case
├── logo.webp                   # ANGWY logo
└── .github/
    └── workflows/
        └── validate.yml        # CI: validate SKILL.md + conformance tests
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

ANGWY is designed to work with any agent that supports the [Agent Skills specification](https://agentskills.io). Compatible with OpenCode, Claude Code, Cursor, Codex, and other agents that load `SKILL.md` files. The `agentskills` compatibility claim means this skill follows the official SKILL.md format and frontmatter specification.

## Validation

Run the skill validator to check frontmatter and structure:

```bash
node scripts/validate-skill.mjs
```

## Troubleshooting / FAQ

**How do I know ANGWY is active?**
ANGWY is intentionally silent about its activation. It does not announce itself, display a status indicator, or explain its rules unless you explicitly ask about the skill. The only reliable signal is behavioral: responses should be direct, rigorous, and free of pleasantries or hedging. If you're getting "I'd be happy to help" or lengthy preambles, the skill is not loaded correctly.

**Why didn't it downgrade to P1/P2 when I asked for speed?**
P1 and P2 are reserved for explicit speed or brevity requests. Phrases like "quickly", "briefly", "short answer", or "no details" trigger the downgrade. Vague requests like "just answer" without a speed/brevity qualifier stay at P3.

**Can I use ANGWY with [agent name]?**
ANGWY works with any agent that supports the [Agent Skills specification](https://agentskills.io) and loads `SKILL.md` files. This includes OpenCode, Claude Code, Cursor, Codex, and others. If your agent supports custom skills, it should work.

**What if the agent explains the skill instead of answering?**
This is a conformance failure. The skill explicitly forbids meta-commentary. If this happens, report it as a bug with the agent name and conversation export.

**Does ANGWY override safety rules?**
No. Pressure never overrides safety, truthfulness, or legal constraints. If a request is harmful, illegal, or unsafe, the skill de-escalates and produces the safest high-quality partial answer or refuses.

**How do I disable ANGWY?**
Say `ANGWY off`, `stand down`, `normal mode`, or `disable pressure skill`. Note that cross-session persistence depends on your agent's skill loading mechanism.

**Why does it sometimes ask for clarification instead of answering?**
If a critical detail is missing that would materially change the answer, ANGWY asks one precise question rather than guessing. This is intentional -- it prevents wasted effort on wrong assumptions.

## License

Apache 2.0 -- see [LICENSE](LICENSE) for details.

> ## Forking Rules
>
> Under Apache 2.0, you **must**:
>
> | Rule | Requirement |
> |------|-------------|
> | Keep LICENSE | Do not remove or modify the `LICENSE` file |
> | Preserve copyright | Retain `Copyright 2026 ChloeVPin` in all copies |
>
> In addition to Apache 2.0 requirements, ANGWY requests that you:
>
> | Rule | Requirement |
> |------|-------------|
> | State changes | Clearly mark any modified files with your changes |
> | Include attribution | Keep this `README.md` or equivalent notice |
>
> **Do not** remove or obscure the original license or copyright.
