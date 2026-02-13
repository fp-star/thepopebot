# Configuration Templates

This directory contains ready-to-use configuration files for code quality tools. Copy the relevant files to your project root and customize as needed.

## Directory Structure

```
config-templates/
├── javascript/          # JavaScript/TypeScript configurations
│   ├── .eslintrc.js    # ESLint configuration
│   ├── .prettierrc     # Prettier code formatter
│   ├── jest.config.js  # Jest testing framework
│   └── package.json    # npm scripts and dev dependencies
├── python/              # Python configurations
│   ├── pylintrc        # Pylint configuration
│   ├── setup.cfg       # Flake8, pytest, coverage config
│   └── pyproject.toml  # Black, isort, bandit config
├── ci-cd/               # CI/CD configurations
│   └── github-actions-quality.yml  # GitHub Actions workflow
├── .editorconfig        # Editor configuration (all projects)
└── sonar-project.properties  # SonarQube/SonarCloud config
```

## Quick Start Guide

### For JavaScript/TypeScript Projects

1. **Copy configuration files:**
   ```bash
   cp config-templates/javascript/.eslintrc.js .
   cp config-templates/javascript/.prettierrc .
   cp config-templates/javascript/jest.config.js .
   cp config-templates/.editorconfig .
   cp config-templates/sonar-project.properties .
   ```

2. **Install dependencies:**
   ```bash
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
     lint-staged
   ```

3. **Add npm scripts (from package.json template)**

4. **Initialize Git hooks:**
   ```bash
   npx husky install
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

5. **Run quality checks:**
   ```bash
   npm run lint
   npm run format
   npm test
   ```

### For Python Projects

1. **Copy configuration files:**
   ```bash
   cp config-templates/python/pylintrc .
   cp config-templates/python/setup.cfg .
   cp config-templates/python/pyproject.toml .
   cp config-templates/.editorconfig .
   cp config-templates/sonar-project.properties .
   ```

2. **Create requirements-dev.txt:**
   ```
   pytest>=7.4.0
   pytest-cov>=4.1.0
   black>=23.0.0
   isort>=5.12.0
   flake8>=6.0.0
   pylint>=3.0.0
   mypy>=1.5.0
   bandit>=1.7.5
   safety>=2.3.0
   pre-commit>=3.4.0
   ```

3. **Install development dependencies:**
   ```bash
   pip install -r requirements-dev.txt
   ```

4. **Set up pre-commit hooks:**
   ```bash
   pre-commit install
   ```

5. **Run quality checks:**
   ```bash
   black .
   isort .
   flake8 .
   pylint src/
   mypy src/
   pytest --cov
   ```

### CI/CD Setup (GitHub Actions)

1. **Copy workflow file:**
   ```bash
   mkdir -p .github/workflows
   cp config-templates/ci-cd/github-actions-quality.yml .github/workflows/quality.yml
   ```

2. **Add required secrets to GitHub repository:**
   - `SNYK_TOKEN` - Get from https://snyk.io
   - `SONAR_TOKEN` - Get from https://sonarcloud.io

3. **Configure branch protection:**
   - Go to Settings → Branches
   - Add rule for main/develop branches
   - Require status checks to pass before merging
   - Select "Code Quality" workflow

## Configuration Customization

### Adjusting Quality Thresholds

**ESLint complexity:**
```javascript
'complexity': ['error', 10],  // Change 10 to your threshold
```

**Test coverage threshold:**
```javascript
// jest.config.js
coverageThreshold: {
  global: {
    lines: 80,  // Adjust percentage here
  }
}
```

**Python line length:**
```ini
# pylintrc
[FORMAT]
max-line-length=100  # Change to your preference
```

### Adding Custom Rules

**ESLint custom rules:**
```javascript
// .eslintrc.js
rules: {
  'your-custom-rule': 'error',
}
```

**Pylint custom rules:**
```ini
# pylintrc
[MESSAGES CONTROL]
enable=
    your-custom-check
```

## Tool-Specific Documentation

### ESLint
- Configuration: `.eslintrc.js`
- Docs: https://eslint.org/docs/latest/
- Run: `npm run lint`
- Fix: `npm run lint:fix`

### Prettier
- Configuration: `.prettierrc`
- Docs: https://prettier.io/docs/
- Run: `npm run format:check`
- Fix: `npm run format`

### Jest
- Configuration: `jest.config.js`
- Docs: https://jestjs.io/docs/
- Run: `npm test`
- Watch: `npm run test:watch`
- Coverage: `npm run test:coverage`

### Pylint
- Configuration: `pylintrc`
- Docs: https://pylint.readthedocs.io/
- Run: `pylint src/`

### Black
- Configuration: `pyproject.toml`
- Docs: https://black.readthedocs.io/
- Run: `black .`
- Check: `black --check .`

### Pytest
- Configuration: `setup.cfg` or `pyproject.toml`
- Docs: https://docs.pytest.org/
- Run: `pytest`
- Coverage: `pytest --cov`

### SonarQube
- Configuration: `sonar-project.properties`
- Docs: https://docs.sonarqube.org/
- Run locally: `sonar-scanner`

## Integration with IDEs

### VS Code

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript", "typescript"],
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black"
}
```

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "ryanluker.vscode-coverage-gutters",
    "sonarsource.sonarlint-vscode"
  ]
}
```

### IntelliJ IDEA / WebStorm

1. Install plugins:
   - ESLint
   - Prettier
   - SonarLint
   - CheckStyle-IDEA (for Java)

2. Configure:
   - Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint → Enable
   - Settings → Languages & Frameworks → JavaScript → Prettier → Enable
   - Settings → Tools → Actions on Save → Enable format and optimize imports

## Troubleshooting

### ESLint not finding configuration
```bash
# Verify .eslintrc.js is in project root
# Check for conflicting .eslintrc files in subdirectories
```

### Jest can't find modules
```javascript
// jest.config.js - Add module name mapper
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Python import errors
```bash
# Add src to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
```

### CI/CD pipeline failing
```bash
# Check node/python versions match local
# Verify all secrets are configured
# Check file paths in configuration
```

## Best Practices

1. **Start with lenient rules, tighten gradually**
   - Don't overwhelm team with 1000 errors immediately
   - Fix critical issues first, then improve incrementally

2. **Use automated formatting**
   - Prettier/Black eliminate style debates
   - Focus on logic, not formatting

3. **Pre-commit hooks**
   - Catch issues before they reach CI
   - Faster feedback loop

4. **Coverage thresholds**
   - Start at 50%, increase to 80%+ over time
   - Don't obsess over 100% - focus on critical paths

5. **Regular updates**
   - Update dependencies monthly
   - Review and adjust rules quarterly
   - Stay current with tool versions

## Additional Resources

- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Jest Configuration](https://jestjs.io/docs/configuration)
- [Pylint Messages](https://pylint.pycqa.org/en/latest/messages/messages_overview.html)
- [Black Code Style](https://black.readthedocs.io/en/stable/the_black_code_style/index.html)
- [SonarQube Rules](https://rules.sonarsource.com/)

## Support

For questions or issues with these configurations:
1. Check tool-specific documentation
2. Review this README
3. Consult with team lead
4. Open an issue in the project repository

---

**Last Updated:** February 13, 2026  
**Configuration Version:** 1.0  
**Status:** Ready for use
