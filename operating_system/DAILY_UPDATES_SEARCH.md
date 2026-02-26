# Daily thepopebot Updates Search

## Objective

Search for and report recent updates, activity, and discussions about thepopebot across multiple channels including GitHub, AI/automation communities, and web content.

## Required Skills

- **brave-search**: For web searches and content extraction
- **GitHub CLI tools**: For checking repository activity

## Task Instructions

### 1. GitHub Repository Activity

Check the thepopebot GitHub repository for recent activity:

```bash
# Get recent commits (last 24 hours)
gh api repos/:owner/:repo/commits --jq '.[] | select(.commit.author.date > (now - 86400 | strftime("%Y-%m-%dT%H:%M:%SZ"))) | {sha: .sha[0:7], message: .commit.message, author: .commit.author.name, date: .commit.author.date}'

# Get recent issues (opened or updated in last 7 days)
gh api repos/:owner/:repo/issues --jq '.[] | select(.updated_at > (now - 604800 | strftime("%Y-%m-%dT%H:%M:%SZ"))) | {number: .number, title: .title, state: .state, updated: .updated_at}'

# Get recent pull requests
gh api repos/:owner/:repo/pulls --jq '.[] | select(.updated_at > (now - 604800 | strftime("%Y-%m-%dT%H:%M:%SZ"))) | {number: .number, title: .title, state: .state, updated: .updated_at}'

# Check for recent releases
gh api repos/:owner/:repo/releases --jq '.[0] | {tag: .tag_name, name: .name, published: .published_at, url: .html_url}'
```

**Note:** Replace `:owner/:repo` with the actual repository path (e.g., `stephengpope/thepopebot` or your fork).

### 2. Web Search for thepopebot Mentions

Use the brave-search skill to search for recent mentions:

1. **General updates search**
   - Query: "thepopebot updates OR news OR release"
   - Focus on: Last 7 days
   - Look for: Blog posts, articles, announcements

2. **AI/Automation communities**
   - Query: "thepopebot AI agent OR autonomous"
   - Check: Reddit (r/artificial, r/LLMs, r/ChatGPT), Hacker News, AI forums
   - Look for: Discussions, comparisons, use cases

3. **GitHub discussions and issues**
   - Query: "site:github.com thepopebot"
   - Look for: External repositories mentioning thepopebot, forks, integrations

4. **Technical discussions**
   - Query: "thepopebot Docker OR GitHub Actions OR Pi agent"
   - Look for: Technical implementations, tutorials, guides

### 3. Search Execution Guidelines

For each search:
- Use the brave-search skill with appropriate queries
- Filter for content from the last 7 days when possible
- Extract key information: title, date, source, summary
- Note any trending discussions or breaking changes

### 4. Report Structure

Generate a structured markdown report with the following sections:

```markdown
# thepopebot Daily Updates Report
**Date:** [YYYY-MM-DD]
**Report Period:** Last 24 hours

## 🔄 GitHub Activity

### Recent Commits
- [List commits with sha, message, author, date]
- [If none: "No new commits in the last 24 hours"]

### Issues & Pull Requests
- [List active/updated issues and PRs]
- [If none: "No new or updated issues/PRs"]

### Releases
- [Latest release info if any]
- [If none: "No new releases"]

## 🌐 Web Mentions & Discussions

### Articles & Blog Posts
- [Title, source, date, summary, link]

### Community Discussions
- [Platform, topic, engagement level, link]

### Technical Content
- [Tutorials, guides, implementations found]

## 📊 Summary

### Key Highlights
- [Bullet points of most important findings]

### Trends
- [Any emerging patterns or increased interest]

### Action Items
- [Any issues that need attention]
- [Questions that need answers]
- [Opportunities for engagement]

## 🔍 Search Quality

- Total searches performed: [N]
- Relevant results found: [N]
- Date range covered: [Last N days]
```

### 5. Error Handling

If searches fail or return no results:
- Log the specific error or empty result
- Continue with remaining searches
- Include a "Search Issues" section in the report noting any failures
- Suggest manual investigation if multiple searches fail

### 6. Output Location

Save the report to: `logs/daily-updates/YYYY-MM-DD-updates-report.md`

Create the directory if it doesn't exist:
```bash
mkdir -p logs/daily-updates
```

## Success Criteria

- ✅ All search types attempted (GitHub + web searches)
- ✅ Report generated with structured format
- ✅ Key findings clearly summarized
- ✅ Errors logged if any searches fail
- ✅ Report saved to logs directory

## Notes

- This task runs daily at 9:00 AM CET (8:00 AM UTC)
- Focus on actionable intelligence and significant changes
- Prioritize quality over quantity in findings
- If no significant updates found, report "All quiet - no major updates"
