# Changelog

All notable changes to ANGWY will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Conformance fixture with 3 test cases (neutral-greeting, stern-coding-request, hostile-correction)
- Provider-specific test samples for OpenCode (all 3 test cases)
- Generic reference samples for all test cases
- CI workflow running frontmatter validation and conformance tests
- ROADMAP.md for project planning

### Changed
- SKILL.md now explicitly forbids meta-commentary and skill self-explanation on neutral input
- Pressure levels P1 and P2 are no longer defaults; P3 is minimum for all inputs
- License changed from MIT to Apache 2.0 for enforceable attribution

### Fixed
- Fixed dead `expected_artifacts` checking in conformance runner
- Fixed pattern matching to use word boundaries instead of raw substring
- Removed Python-locked required patterns from conformance fixture
- Fixed tautological directory-name check in validate-skill.mjs
- Redacted raw file paths from test samples

## [1.0.0] - 2026-08-03

### Added
- Initial release of ANGWY: Adversarial Rigor Protocol
- Core SKILL.md with P0-P5 pressure levels
- Anti-sycophancy, gaslighting conversion, and anti-hedging rules
- Task-specific modules for coding, reasoning, analysis, creative work, planning, and high-stakes domains
- Apache 2.0 license with forking rules
