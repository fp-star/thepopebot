Perform a comprehensive security review of the repository https://github.com/fp-star/AC1_IDE. The job should:

1. Clone and examine the AC1_IDE repository structure and codebase
2. Conduct a thorough security audit covering:
   - Code injection vulnerabilities (XSS, SQL injection, command injection)
   - Authentication and authorization flaws
   - Input validation and sanitization issues
   - Dependency vulnerabilities (package.json, requirements.txt, etc.)
   - Secrets or credentials accidentally committed to the repository
   - File upload/download security issues
   - API endpoint security (if applicable)
   - Docker/container security configurations
   - CI/CD pipeline security
3. Check for common web application security issues (OWASP Top 10)
4. Review permissions and access controls
5. Generate a detailed security report with:
   - Executive summary of findings
   - Categorized list of vulnerabilities (Critical, High, Medium, Low)
   - Specific code locations and examples where issues exist
   - Recommended remediation steps for each finding
   - Best practices suggestions
6. Save the security audit report to logs/{JOB_ID}/security_audit_report.md

This will provide a comprehensive security assessment of the AC1_IDE codebase with actionable remediation guidance.