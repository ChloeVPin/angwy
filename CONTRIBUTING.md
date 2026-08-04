# Contributing to ANGWY

Thank you for your interest in improving ANGWY. This document provides guidelines for contributors.

## How to Contribute

1. Fork the repo and create a feature branch from `main`.
2. Make your changes, following the existing code style.
3. Run `npm test` to ensure all validation and conformance tests pass.
4. Submit a pull request with a clear description of the change.

## Code Style

- Markdown files: use proper GitHub-flavored markdown, no emojis, no em dashes.
- JavaScript: use ES modules (`import`/`export`), 2-space indentation.
- Python: follow PEP 8, 4-space indentation.
- Commit messages: imperative mood, lowercase, no period at the end.

## Testing

- All changes to `SKILL.md`, `references/`, `scripts/`, or `tests/` trigger CI.
- CI runs `npm test`, which includes frontmatter validation and conformance tests.
- If you add a new test case to `fixture.json`, include a corresponding sample file in `tests/conformance/samples/`.

## Reporting Issues

- Use GitHub Issues for bugs and feature requests.
- For conformance failures on specific agents, include the agent name, version, and full conversation export.

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.
