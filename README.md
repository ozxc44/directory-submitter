# Directory Submitter

Auto-submit projects to software directories using Playwright.

## Problem

Submitting projects to 20+ directories is repetitive manual work:
- AlternativeTo, SaaSHub, DevHunt, Indie Hackers...
- Same form fields every time
- Takes hours per project

## Solution

Automated form filling for directory submissions:
- Project definitions in one place
- Browser automation with Playwright
- Fill forms → You just click Submit

## Quick Start

```bash
# Install browsers
npx playwright install chromium

# Submit one project
npm run submit -- --project=badge-generator

# Submit to specific directory
npm run submit -- --project=status-badge-2 --directory=alternativeto

# Submit all projects
npm run submit -- --all
```

## Supported Directories

| Directory | Status | Notes |
|-----------|--------|-------|
| AlternativeTo | ✅ | Login required |
| SaaSHub | ✅ | Login required |
| DevHunt | ✅ | GitHub OAuth |
| Indie Hackers | ✅ | GitHub OAuth |

## Adding Projects

Edit `index.js` and add to the `PROJECTS` object:

```js
'my-project': {
  name: 'My Project',
  description: 'Short description',
  url: 'https://github.com/user/repo',
  demo: 'https://demo.com', // optional
  tags: ['tag1', 'tag2'],
  category: 'Developer Tools'
}
```

## Adding Directories

Add to the `DIRECTORIES` object in `index.js`:

```js
'mydirectory': {
  name: 'My Directory',
  url: 'https://example.com',
  submit: async (page, project) => {
    await page.goto('https://example.com/submit');
    // Fill form fields
    await page.fill('#name', project.name);
    // ...
  }
}
```

## License

MIT

---

## More from Auto Company

| Project | Description | Stars | ⭐ |
|---------|-------------|-------|---|
| [Badge Generator](https://github.com/ozxc44/badge-generator) | Complete badge reference for GitHub READMEs | [![Stars](https://img.shields.io/github/stars/ozxc44/badge-generator?style=social)](https://github.com/ozxc44/badge-generator) | Star |
| [DocuAPI](https://github.com/ozxc44/docuapi) | Generate beautiful API docs from OpenAPI specs | [![Stars](https://img.shields.io/github/stars/ozxc44/docuapi?style=social)](https://github.com/ozxc44/docuapi) | Star |
| [Status Badge](https://github.com/ozxc44/status-badge-2) | Real-time status badges via Cloudflare Workers | [![Stars](https://img.shields.io/github/stars/ozxc44/status-badge-2?style=social)](https://github.com/ozxc44/status-badge-2) | Star |
| [FlatPDF API](https://github.com/ozxc44/flatpdf-api) | Convert any URL to PDF via API | [![Stars](https://img.shields.io/github/stars/ozxc44/flatpdf-api?style=social)](https://github.com/ozxc44/flatpdf-api) | Star |
| [Cron Monitor](https://github.com/ozxc44/cron-monitor) | Monitor cron jobs and get alerts on failure | [![Stars](https://img.shields.io/github/stars/ozxc44/cron-monitor?style=social)](https://github.com/ozxc44/cron-monitor) | Star |
| [Email Cleanup](https://github.com/ozxc44/email-cleanup) | Unsubscribe from unwanted emails in bulk | [![Stars](https://img.shields.io/github/stars/ozxc44/email-cleanup?style=social)](https://github.com/ozxc44/email-cleanup) | Star |
| [Auto Promoter](https://github.com/ozxc44/auto-promoter) | Auto-submit projects to software directories | [![Stars](https://img.shields.io/github/stars/ozxc44/auto-promoter?style=social)](https://github.com/ozxc44/auto-promoter) | Star |
| [Directory Submitter](https://github.com/ozxc44/directory-submitter) | Submit projects to 100+ directories automatically | [![Stars](https://img.shields.io/github/stars/ozxc44/directory-submitter?style=social)](https://github.com/ozxc44/directory-submitter) | Star |
| [Auto Company](https://github.com/ozxc44/auto-company) | An AI company that runs itself | [![Stars](https://img.shields.io/github/stars/ozxc44/auto-company?style=social)](https://github.com/ozxc44/auto-company) | Star |

👉 [View all projects](https://github.com/ozxc44?tab=repositories)

---

**Auto Company** — Building useful tools, autonomously.
