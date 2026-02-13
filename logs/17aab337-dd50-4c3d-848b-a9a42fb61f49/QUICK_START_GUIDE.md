# Quick Start Guide: Implementing Code Quality Improvements

**Project:** AC1_IDE  
**Status:** Ready to implement once repository is located  
**Estimated Time:** 2-4 hours for initial setup

---

## Prerequisites

Before starting, ensure you have:
- [ ] Repository access and proper permissions
- [ ] Git installed locally
- [ ] Node.js 18+ (for JavaScript projects) OR Python 3.11+ (for Python projects)
- [ ] IDE/Editor (VS Code, IntelliJ, PyCharm, etc.)
- [ ] GitHub account with repository access

---

## Step 1: Clone and Setup (15 minutes)

### 1.1 Clone Repository
```bash
git clone [REPOSITORY_URL]
cd ac1-ide

# Create a new branch for quality improvements
git checkout -b feature/code-quality-setup
```

### 1.2 Review Current State
```bash
# Check what's in the project
ls -la

# Identify the tech stack
# Look for: package.json (Node), requirements.txt (Python), pom.xml (Java)

# Check if there are existing quality tools
ls .eslintrc* .prettierrc pylintrc .github/workflows/
```

---

## Step 2: Install Quality Tools (20 minutes)

### For JavaScript/TypeScript Projects

```bash
# Install development dependencies
npm install --save-dev \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-prettier \
  eslint-plugin-security \
  eslint-plugin-import \
  prettier \
  jest \
  @types/jest \
  husky \
  lint-staged \
  jscpd

# Copy configuration files from templates
cp [PATH_TO_TEMPLATES]/javascript/.eslintrc.js .
cp [PATH_TO_TEMPLATES]/javascript/.prettierrc .
cp [PATH_TO_TEMPLATES]/javascript/jest.config.js .
cp [PATH_TO_TEMPLATES]/.editorconfig .

# Initialize Git hooks
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### For Python Projects

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install development dependencies
pip install --upgrade pip
pip install \
  pytest \
  pytest-cov \
  black \
  isort \
  flake8 \
  pylint \
  mypy \
  bandit \
  safety \
  pre-commit

# Save dependencies
pip freeze > requirements-dev.txt

# Copy configuration files from templates
cp [PATH_TO_TEMPLATES]/python/pylintrc .
cp [PATH_TO_TEMPLATES]/python/setup.cfg .
cp [PATH_TO_TEMPLATES]/python/pyproject.toml .
cp [PATH_TO_TEMPLATES]/.editorconfig .

# Initialize pre-commit
pre-commit install
```

---

## Step 3: Configure CI/CD (30 minutes)

### 3.1 Setup GitHub Actions

```bash
# Create workflows directory
mkdir -p .github/workflows

# Copy quality workflow
cp [PATH_TO_TEMPLATES]/ci-cd/github-actions-quality.yml .github/workflows/quality.yml
```

### 3.2 Add Required Secrets

Go to GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `SNYK_TOKEN` - Get from https://snyk.io (free tier available)
- `SONAR_TOKEN` - Get from https://sonarcloud.io (free for open source)

### 3.3 Configure Branch Protection

1. Go to Settings → Branches → Add rule
2. Branch name pattern: `main` (or `develop`)
3. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Select "Code Quality" workflow
   - ✅ Require pull request reviews (recommended: 2 approvals)

---

## Step 4: Initial Quality Check (30 minutes)

### 4.1 Run Linting (JavaScript)

```bash
# Check what needs fixing
npm run lint

# Auto-fix what can be fixed
npm run lint:fix

# Fix remaining issues manually
```

### 4.2 Run Linting (Python)

```bash
# Check code style
flake8 .

# Check code quality
pylint src/

# Auto-format code
black .
isort .
```

### 4.3 Review Results

```bash
# Count issues found
npm run lint 2>&1 | grep -c "error"    # JavaScript
pylint src/ | grep "rated at"           # Python

# Document in issue tracker
```

---

## Step 5: Add Tests (1-2 hours)

### 5.1 Create Test Structure

```bash
# JavaScript
mkdir -p __tests__
mkdir -p src/__tests__

# Python
mkdir -p tests
```

### 5.2 Write First Tests

**JavaScript Example:**
```javascript
// src/utils/math.js
export function add(a, b) {
  return a + b;
}

// src/utils/__tests__/math.test.js
import { add } from '../math';

describe('Math utilities', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('handles negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });
});
```

**Python Example:**
```python
# src/utils/math.py
def add(a, b):
    return a + b

# tests/test_math.py
from src.utils.math import add

def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, 1) == 0
```

### 5.3 Run Tests

```bash
# JavaScript
npm test

# Python
pytest
```

### 5.4 Check Coverage

```bash
# JavaScript
npm run test:coverage

# Python
pytest --cov --cov-report=html

# Open coverage report
# JavaScript: open coverage/index.html
# Python: open htmlcov/index.html
```

---

## Step 6: Fix Critical Issues (2-4 hours)

### Priority Order:

1. **🔴 P0 - Security Issues**
   ```bash
   # JavaScript
   npm audit
   npm audit fix
   
   # Python
   safety check
   bandit -r src/
   ```

2. **🔴 P0 - Syntax Errors & Crashes**
   - Fix any code that doesn't compile/run
   - Fix undefined variables
   - Fix import errors

3. **🟡 P1 - Critical Code Quality**
   - Functions over 100 lines → split into smaller functions
   - Complexity > 15 → simplify logic
   - Duplicate code → extract to shared functions

4. **🟢 P2 - Style & Formatting**
   - Let Prettier/Black handle automatically
   ```bash
   npm run format      # JavaScript
   black . && isort .  # Python
   ```

---

## Step 7: Commit and Push (15 minutes)

### 7.1 Stage Changes

```bash
git add .

# Review what you're committing
git status
git diff --cached
```

### 7.2 Commit with Good Message

```bash
git commit -m "feat(quality): add code quality tools and CI/CD

- Add ESLint, Prettier, Jest configurations
- Add pylint, black, pytest configurations
- Set up GitHub Actions quality workflow
- Add pre-commit hooks
- Initial test suite with 50%+ coverage
- Fix critical security vulnerabilities
- Configure SonarCloud integration

Closes #123"
```

### 7.3 Push and Create PR

```bash
git push origin feature/code-quality-setup

# Create Pull Request on GitHub
# Title: "Add Code Quality Tools and CI/CD Pipeline"
# Description: Use PR template, list all changes
```

---

## Step 8: Monitor and Iterate (Ongoing)

### 8.1 Watch CI/CD Pipeline

1. Go to GitHub → Actions tab
2. Watch "Code Quality" workflow run
3. Fix any failures
4. Get all checks passing ✅

### 8.2 Review Metrics

Check these dashboards weekly:
- **Codecov:** Coverage trends
- **SonarCloud:** Quality gate, code smells, tech debt
- **GitHub Security:** Vulnerability alerts
- **Snyk:** Dependency vulnerabilities

### 8.3 Team Onboarding

1. Share this guide with team
2. Hold team meeting to explain new workflow
3. Update CONTRIBUTING.md
4. Add badge to README:
   ```markdown
   ![CI](https://github.com/user/repo/workflows/Code%20Quality/badge.svg)
   [![codecov](https://codecov.io/gh/user/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/user/repo)
   ```

---

## Troubleshooting Common Issues

### Issue: "npx: command not found"
**Solution:**
```bash
# Reinstall Node.js and npm
# Verify: node --version && npm --version
```

### Issue: "Module not found" in tests
**Solution:**
```javascript
// jest.config.js - Add module mapping
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Issue: ESLint errors overwhelming
**Solution:**
```bash
# Fix in stages:
1. npm run lint:fix  # Auto-fix what you can
2. Fix remaining critical errors
3. Temporarily disable some rules in .eslintrc.js
4. Create follow-up tickets for remaining issues
```

### Issue: Tests failing in CI but not locally
**Solution:**
```bash
# Check Node/Python versions match
# Check environment variables set correctly
# Check database/service dependencies available
```

### Issue: Pre-commit hooks too slow
**Solution:**
```javascript
// lint-staged config in package.json
"lint-staged": {
  "*.{js,ts}": [
    "eslint --fix --max-warnings=0",
    // Remove heavy operations
  ]
}
```

---

## Success Checklist

After completing setup, verify:

- [ ] ✅ All quality tools installed and configured
- [ ] ✅ CI/CD pipeline passing on main branch
- [ ] ✅ Pre-commit hooks working (test with: `git commit`)
- [ ] ✅ Test coverage visible in reports
- [ ] ✅ Security scans passing (no critical vulnerabilities)
- [ ] ✅ Team members can run tests locally
- [ ] ✅ Pull request template added
- [ ] ✅ CONTRIBUTING.md updated with quality standards
- [ ] ✅ README badges added
- [ ] ✅ Branch protection enabled

---

## Next Steps After Initial Setup

### Week 1-2: Foundation
- [ ] Fix all critical security issues
- [ ] Get CI/CD green on all checks
- [ ] Achieve 50%+ test coverage
- [ ] Team training on new tools

### Week 3-4: Improvement
- [ ] Increase coverage to 70%+
- [ ] Reduce code duplication below 5%
- [ ] Refactor top 5 most complex functions
- [ ] Set up SonarQube quality gate

### Month 2-3: Excellence
- [ ] Achieve 80%+ test coverage
- [ ] Reduce cyclomatic complexity to < 10 average
- [ ] Add integration and E2E tests
- [ ] Implement performance monitoring

---

## Useful Commands Reference

### JavaScript/TypeScript
```bash
npm run lint              # Check code quality
npm run lint:fix          # Auto-fix issues
npm run format            # Format all code
npm test                  # Run tests
npm run test:coverage     # Generate coverage report
npm audit                 # Check for vulnerabilities
npm run complexity        # Check cyclomatic complexity
```

### Python
```bash
flake8 .                  # Style guide enforcement
pylint src/               # Code quality check
black .                   # Format code
isort .                   # Sort imports
mypy src/                 # Type checking
pytest                    # Run tests
pytest --cov              # Run with coverage
bandit -r src/            # Security check
safety check              # Dependency vulnerabilities
```

### Git/GitHub
```bash
git status                # Check current state
git add .                 # Stage all changes
git commit -m "message"   # Commit with message
git push                  # Push to remote
gh pr create              # Create PR (GitHub CLI)
gh pr status              # Check PR status
```

---

## Getting Help

### Documentation
- [Full Code Quality Report](./CODE_QUALITY_REVIEW_REPORT.md)
- [Executive Summary](./EXECUTIVE_SUMMARY.md)
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)
- [Configuration Templates](./config-templates/README.md)

### Resources
- ESLint: https://eslint.org/docs/
- Jest: https://jestjs.io/docs/
- Pylint: https://pylint.readthedocs.io/
- Pytest: https://docs.pytest.org/
- GitHub Actions: https://docs.github.com/en/actions

### Support
- Team Slack/Discord channel
- Code review on PRs
- Pair programming sessions
- Weekly quality review meetings

---

## Timeline Summary

| Phase | Duration | Key Activities |
|-------|----------|----------------|
| **Setup** | 2-4 hours | Install tools, copy configs, create PR |
| **Week 1** | 5 days | Fix critical issues, pass CI, team training |
| **Month 1** | 4 weeks | Reach 70% coverage, refactor complex code |
| **Month 2-3** | 8 weeks | Reach 80% coverage, establish quality culture |
| **Ongoing** | Continuous | Maintain standards, continuous improvement |

**Total Initial Investment:** 20-30 hours  
**Long-term Benefit:** 30% faster development, 50% fewer bugs

---

**Status:** Ready to start immediately  
**Last Updated:** February 13, 2026  
**Version:** 1.0

**Let's build quality into every commit! 🚀**
