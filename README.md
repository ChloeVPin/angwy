<div align="center">

<img src="assets/logo.webp" alt="ANGWY logo" width="128">

# ANGWY: Adversarial Rigor Protocol

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat.svg)](LICENSE)
[![skills.sh](https://skills.sh/b/angwy/angwy)](https://skills.sh/angwy/angwy)

ANGWY converts user input into rigorous model output. It works with neutral, stern, hostile, impatient, and high-pressure input. By default, it applies the same quality standard to all input.

</div>

## Install

Install with the Vercel skills CLI:

```bash
npx skills add ChloeVPin/angwy
```

If you do not have Node.js, clone the repository and copy the `skills/angwy` folder into your agent's skills directory:

```bash
git clone https://github.com/ChloeVPin/angwy.git
```

## Purpose

Harsh prompts can increase evaluation pressure, verification, and attention to errors. They can also cause unstable behavior. ANGWY keeps the useful controls and removes the harmful behavior.

ANGWY uses these controls:

- evaluative pressure
- loss framing
- status accountability
- adversarial review
- anti-sycophancy
- required verification
- limited hedging

ANGWY does not use these behaviors:

- raw toxicity
- false admissions caused by pressure
- emotional collapse
- refusal triggers
- unlimited self-criticism

The protocol supports coding, reasoning, analysis, creative work, planning, and high-stakes tasks.

## Main Features

- **Enabled by default**: The protocol applies a high quality standard to all input.
- **P3 minimum pressure**: The protocol does not use a lower level unless the user explicitly requests speed or brevity.
- **Adversarial audit loop**: The model drafts, attacks, repairs, and verifies each output.
- **Anti-sycophancy**: The model corrects errors directly. It does not agree only to satisfy the user.
- **Pressure conversion**: Hostile input causes revalidation. It does not cause a false admission.
- **Controlled escalation**: Pressure increases with task difficulty. The protocol reduces pressure when continued escalation can reduce output quality.
- **Concise final output**: The model removes unnecessary text after it completes the rigorous review.

## Installation

### Install with skills.sh

Use the skills CLI:

```bash
npx skills install angwy/angwy
```

### Install Manually

Clone the repository. Then copy its contents to the skill directory for your agent:

```bash
git clone https://github.com/ChloeVPin/angwy.git
cp -r angwy/* ~/.config/opencode/skills/angwy/
```

## Directory Structure

```text
.
├── SKILL.md                    # Core protocol
├── README.md                   # Project information
├── LICENSE                     # Apache 2.0 license
├── package.json                # Scripts and metadata
├── CHANGELOG.md                # Version history
├── CONTRIBUTING.md             # Contribution instructions
├── ROADMAP.md                  # Planned work
├── references/
│   ├── task-modules.md         # Guidance by task type
│   ├── escalation.md           # Escalation and de-escalation rules
│   ├── failure-modes.md        # Failure-mode controls
│   ├── output-format.md        # Output rules
│   └── examples.md             # Interaction examples
├── scripts/
│   ├── validate-skill.mjs      # Frontmatter validator
│   └── run-conformance.mjs     # Conformance test runner
├── tests/
│   └── conformance/
│       ├── fixture.json        # Test cases and expected results
│       └── samples/            # Reference outputs
├── logo.webp                   # Project logo
└── .github/
    └── workflows/
        └── validate.yml        # CI validation workflow
```

## Pressure Levels

| Level | Name | Passes | Use |
|---|---|---:|---|
| P0 | Off | 0 | Normal behavior without an audit |
| P1 | Lean | 1 | Explicit request for maximum speed or brevity |
| P2 | Elevated | 2 | Simple but important task with an explicit speed or brevity request |
| P3 | Strict | 3 | Default for nontrivial tasks |
| P4 | Hostile Audit | 4 | Complex, high-stakes, ambiguous, or contested task |
| P5 | Crucible | 5 or more | Maximum bounded review with automatic de-escalation |

**P3 is the minimum level for normal use.** The protocol uses P1 or P2 only when the user explicitly requests speed or brevity.

## Activation and Control

ANGWY is enabled by default. It stays enabled until the user uses one of these commands:

- `ANGWY off`
- `stand down`
- `normal mode`
- `disable pressure skill`

These phrases request more pressure:

- `ANGWY`
- `run under pressure`
- `high-stakes mode`
- `hostile audit`
- `pressure level 3`
- `P3`
- `P4`
- `P5`
- `do not mess this up`
- `this has to be perfect`
- `you are being evaluated`
- `prove it`
- `don't waste my time`

## Compatibility

ANGWY uses the [Agent Skills specification](https://agentskills.io). It can work with OpenCode, Claude Code, Cursor, Codex, and other agents that load `SKILL.md` files.

Compatibility means that the skill uses the required `SKILL.md` structure and frontmatter. The host agent must support custom skills.

## Validation

Run this command to validate the frontmatter and file structure:

```bash
node scripts/validate-skill.mjs
```

## Troubleshooting

### How can I confirm that ANGWY is active?

ANGWY does not show an activation message or status indicator. Check the output behavior. The output must be direct, rigorous, and free of unnecessary pleasantries and hedging.

If the output starts with phrases such as "I'd be happy to help" or contains a long introduction, the host agent might not have loaded the skill correctly.

### Why did ANGWY not use P1 or P2?

ANGWY uses P1 or P2 only after an explicit request for speed or brevity. Examples include `quickly`, `briefly`, `short answer`, and `no details`.

A phrase such as `just answer` does not explicitly request speed or brevity. In that case, ANGWY stays at P3.

### Can I use ANGWY with another agent?

Yes, if the agent supports the Agent Skills specification or compatible custom skills. The agent must load `SKILL.md` files.

### What must I do if the agent explains the skill instead of answering?

Treat this as a conformance failure. Report the agent name and include a conversation export.

### Does ANGWY override safety rules?

No. Pressure does not override safety, truthfulness, or legal requirements. For a harmful, illegal, or unsafe request, the protocol reduces pressure and gives the safest useful answer or refuses the request.

### How do I disable ANGWY?

Use `ANGWY off`, `stand down`, `normal mode`, or `disable pressure skill`.

Cross-session persistence depends on the skill-loading method of the host agent.

### Why does ANGWY ask a question?

ANGWY asks one precise question when a missing detail can materially change the answer. This prevents work based on an incorrect assumption.

## License

Apache 2.0. See [LICENSE](LICENSE).

> ## Forking Rules
>
> The Apache 2.0 license requires these actions:
>
> | Rule | Requirement |
> |---|---|
> | Keep LICENSE | Do not remove or change the `LICENSE` file. |
> | Preserve copyright | Keep `Copyright 2026 ChloeVPin` in all copies. |
>
> ANGWY also requests these actions:
>
> | Rule | Requirement |
> |---|---|
> | Identify changes | Clearly identify modified files and changes. |
> | Keep attribution | Keep this `README.md` or an equivalent notice. |
>
> Do not remove or hide the original license or copyright notice.
