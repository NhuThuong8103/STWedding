---
trigger: always_on
---



# Git Commit Message Rules for AI Agents

**Version:** 1.0
**Last Updated:** January 2026
**Reference:** [Mastering Git Commit Messages with AI](https://www.deployhq.com/git/mastering-git-commit-with-ai)

---

## Overview

All commit messages MUST follow the **Conventional Commits** specification. This ensures:
- Clear and understandable project history
- Easy navigation through git log
- Automated changelog generation
- Consistent team communication

**CRITICAL:** Commit messages are **PLAIN TEXT ONLY**. Never include markdown formatting (backticks, bold, italics, code blocks) in actual commit messages.

---

## Format Structure

STRICT RULES:
- Output plain text only
- Follow Conventional Commits
- Use this format exactly:

<type>(<scope>): <subject>

<body>

<footer>

Do not include markdown.
Do not include explanations.
Return only the commit message.

**Example:**
feat(enrollment): Add deposit alternative selection to enrollment flow

Residents can now choose between traditional deposit and deposit
alternative options during the enrollment process. This improves
flexibility and supports the new pricing model.

Fixes #234

---

## 1. Subject Line (Required)

| Rule | Requirement |
|------|-------------|
| **Max Length** | 50 characters (hard limit: 72) |
| **Mood** | Imperative (command form) |
| **Capitalization** | Capitalize first letter after type |
| **Punctuation** | No period at the end |
| **Tense** | Present tense |

### Examples

✅ **Good:**
- `feat(auth): Add two-factor authentication support`
- `fix(payments): Resolve null pointer in refund flow`
- `refactor(charges): Extract status calculation to service`

❌ **Bad:**
- `feat(auth): Added two-factor authentication` (past tense)
- `Fixed some stuff` (vague, no type/scope)
- `WIP` (not descriptive)

---

## 2. Type (Required)

| Type | When to Use |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Code style changes (formatting, whitespace) |
| `refactor` | Code refactoring (no feature/fix) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build, config, or tooling changes |
| `ci` | CI/CD configuration changes |
| `revert` | Reverting a previous commit |

---

## 3. Scope (Recommended)

The scope provides context about what part of the codebase is affected.

### DepositCloud Scopes

**Domain Areas:**
- `auth` - Authentication and authorization
- `payments` - Payment processing
- `enrollment` - Enrollment workflow
- `charges` - Charge management

**Integrations:**
- `yardi` - Yardi integration
- `entrata` - Entrata integration
- `realpage` - RealPage integration

**Communications:**
- `mailer` - Email system
- `sms` - SMS messaging
- `lob` - Physical mail (Lob API)

**Other:**
- `api` - API endpoints
- `admin` - Admin panel
- `reports` - Report generation
- `workers` - Background jobs

---

## 4. Body (Optional but Recommended)

| Rule | Requirement |
|------|-------------|
| **Line Length** | Wrap at 72 characters |
| **Content** | Explain "what" and "why", not "how" |
| **Separation** | Blank line between subject and body |

### What to Include

- **Why** this change is necessary
- **What** problem it solves
- **Any** side effects or breaking changes

### Example

fix(yardi): Prevent timeout during large resident sync

Increased connection timeout from 30s to 120s for properties with
more than 10,000 residents. The previous timeout was too aggressive
for large property portfolios. Added retry logic with exponential
backoff to handle transient network issues.

Fixes #567

---

## 5. Footer (Optional)

Used for:
- **Issue references:** `Fixes #123`, `Closes #456`, `Related to #789`
- **Breaking changes:** `BREAKING CHANGE: description`
- **Co-authors:** `Co-authored-by: Name <email>`

---

## Best Practices

### ✅ DO

1. **Use imperative mood** - Write as a command
   - "Add feature" NOT "Added feature"
   - "Fix bug" NOT "Fixed bug" or "Fixing bug"

2. **Make atomic commits** - One logical change per commit
   - Split unrelated changes into separate commits
   - Each commit should be independently revertable

3. **Focus on the "Why"** - Explain reasoning, not just what changed
   - Code shows WHAT changed
   - Commit message explains WHY

4. **Be specific** - Avoid vague messages
   - "Update code" ❌
   - "Refactor UserService to use dependency injection" ✅

5. **Reference issues** - Link to tickets when applicable
   - Helps track work and automate workflows

### ❌ DON'T

1. **Don't use past tense** in subject
   - "Added" ❌ → "Add" ✅

2. **Don't end subject with a period**
   - "Fix bug." ❌ → "Fix bug" ✅

3. **Don't exceed 50 characters** in subject (72 absolute max)
   - Keeps git log readable

4. **Don't bundle unrelated changes**
   - One fix + one feature = two commits

5. **Don't write vague messages**
   - "Update code", "Fix stuff", "WIP" are all ❌

6. **Don't include markdown formatting**
   - No backticks (```), bold (**), italics (__), etc.
   - Plain text only!

---

## AI Agent Instructions

When generating commit messages, follow this process:

### Step 1: Analyze the Diff
- Review all changed files
- Understand the scope of changes
- Identify the core purpose of the change

### Step 2: Identify the Type
- Is it a new feature? → `feat`
- Is it fixing a bug? → `fix`
- Is it refactoring? → `refactor`
- Is it updating tests? → `test`
- Is it documentation? → `docs`

### Step 3: Determine the Scope
- What module/area is affected?
- Use DepositCloud's scope conventions (see section 3)
- If multiple areas, choose the primary one

### Step 4: Write the Subject
- Use imperative mood
- Keep under 50 characters
- Be specific and clear
- No period at the end

### Step 5: Add Body (if needed)
- For complex changes, explain WHY
- Wrap lines at 72 characters
- Leave blank line after subject

### Step 6: Add Footer (if applicable)
- Reference related issues
- Note breaking changes
- Add co-authors if needed

### Step 7: Output Plain Text
- **No markdown formatting**
- **No code blocks (```)**
- **Plain text only**

---

## Commit Message Template

<type>(<scope>): <imperative verb> <concise description>

<Why is this change needed?>
<What does it accomplish?>
<Any important details or side effects?>

<Footer references if applicable>

---

## Real-World Examples

### Example 1: Feature Addition

feat(enrollment): Add deposit alternative selection to enrollment flow

Residents can now choose between traditional deposit and deposit
alternative options during the enrollment process. This improves
flexibility and supports the new pricing model.

Fixes #234

### Example 2: Bug Fix

fix(yardi): Prevent timeout during large resident sync

Increased connection timeout from 30s to 120s for properties with
more than 10,000 residents. Added retry logic with exponential
backoff to handle transient network issues.

Fixes #567

### Example 3: Refactoring

refactor(charges): Extract status calculation to service object

Moved status calculation logic from Charge model to ChargeStatusService
to improve testability and reduce model complexity. No functional
changes.

### Example 4: Performance Improvement

perf(reports): Optimize invoice generation query

Replaced N+1 query with eager loading for charge associations.
Reduces invoice generation time from 45s to 3s for large companies.

Fixes #892

### Example 5: Test Addition

test(enrollment): Add specs for deposit alternative validation

Covers edge cases including:
- Invalid deposit alternative type
- Missing required fields
- Concurrent enrollment attempts

### Example 6: Chore
chore(deps): Update Rails to 6.0.6.1

Security patch release addressing CVE-2023-XXXX. No breaking changes
expected.

---

## Quick Reference Card
┌─────────────────────────────────────────────────────────────┐
│  COMMIT MESSAGE STRUCTURE                                   │
├─────────────────────────────────────────────────────────────┤
│  <type>(<scope>): <subject>           ← 50 chars max        │
│                                        ← blank line         │
│  <body>                               ← 72 chars/line       │
│                                        ← blank line         │
│  <footer>                             ← references          │
├─────────────────────────────────────────────────────────────┤
│  TYPES: feat | fix | docs | style | refactor | perf |       │
│         test | chore | ci | revert                          │
├─────────────────────────────────────────────────────────────┤
│  MOOD: Imperative (Add, Fix, Update, Remove, Refactor)      │
│  FORMAT: Plain text only - NO markdown formatting           │
└─────────────────────────────────────────────────────────────┘

---

## Enforcement

### Pre-commit Hooks (Optional)

Consider using `commitlint` to enforce these rules:

```bash
npm install --save-dev @commitlint/{cli,config-conventional}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### Manual Review Checklist

Before committing, verify:
- [ ] Subject uses imperative mood
- [ ] Subject is ≤ 50 characters
- [ ] Type is appropriate
- [ ] Scope is included (when applicable)
- [ ] Body explains WHY (for complex changes)
- [ ] Issue references included (when applicable)
- [ ] No markdown formatting in the message
- [ ] Message is plain text only

---

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Mastering Git Commit Messages with AI](https://www.deployhq.com/git/mastering-git-commit-with-ai)
- [DepositCloud Development Guide](./development-guide.md)

---

**Questions?** Contact the development team or refer to `AGENTS.md` for more context.
