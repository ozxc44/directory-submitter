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
