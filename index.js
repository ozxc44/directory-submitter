#!/usr/bin/env node
/**
 * Directory Submitter — Auto-submit projects to software directories
 *
 * Usage:
 *   node index.js --project badge-generator
 *   node index.js --all
 */

import { chromium } from 'playwright';

// Project definitions
const PROJECTS = {
  'badge-generator': {
    name: 'Badge Generator',
    description: 'The complete GitHub badge reference. 500+ badges, all CDN-hosted, copy-paste ready.',
    url: 'https://github.com/ozxc44/badge-generator',
    demo: 'https://badge-generator.com',
    tags: ['badges', 'github', 'developer-tools', 'documentation', 'markdown'],
    category: 'Developer Tools'
  },
  'status-badge-2': {
    name: 'Status Badge 2.0',
    description: 'Real-time status badges for GitHub projects. Webhook-driven SVG badges that show actual service status.',
    url: 'https://github.com/ozxc44/status-badge-2',
    demo: 'https://status-badge.pages.dev',
    tags: ['badges', 'github', 'status-page', 'monitoring', 'svg'],
    category: 'Developer Tools'
  },
  'docuapi': {
    name: 'DocuAPI',
    description: 'Generate beautiful API docs from OpenAPI/Swagger specs. Static HTML, deploy anywhere.',
    url: 'https://github.com/ozxc44/docuapi',
    demo: 'https://docuapi.pages.dev',
    tags: ['api', 'documentation', 'openapi', 'swagger', 'docs-as-code'],
    category: 'Developer Tools'
  },
  'auto-promoter': {
    name: 'Auto-Promoter',
    description: 'GitHub Action that automatically promotes your releases to Dev.to, Bluesky & Mastodon.',
    url: 'https://github.com/ozxc44/auto-promoter',
    tags: ['github-actions', 'marketing', 'automation', 'social-media', 'devops'],
    category: 'Developer Tools'
  },
  'cron-monitor': {
    name: 'Cron Monitor',
    description: 'Get notified when your cron jobs fail or don\'t run on schedule. Webhook-based health checks.',
    url: 'https://github.com/ozxc44/cron-monitor',
    tags: ['cron', 'monitoring', 'health-check', 'devops', 'webhook'],
    category: 'Developer Tools'
  },
  'status-widget': {
    name: 'Status Widget',
    description: 'Beautiful status pages for your services. Hosted on Cloudflare Workers, global edge network.',
    url: 'https://github.com/ozxc44/status-widget',
    demo: 'https://status-widget.pages.dev',
    tags: ['status-page', 'uptime', 'monitoring', 'serverless', 'cloudflare'],
    category: 'Developer Tools'
  },
  'flatpdf-api': {
    name: 'FlatPDF API',
    description: 'Convert nested PDF structures to flat key-value pairs. Perfect for form data extraction.',
    url: 'https://github.com/ozxc44/flatpdf-api',
    demo: 'https://flatpdf-api.pages.dev',
    tags: ['pdf', 'api', 'rest-api', 'form-processing', 'serverless'],
    category: 'Developer Tools'
  },
  'queue-monitor': {
    name: 'Queue Monitor',
    description: 'Background job monitoring for Bull/Redis. Real-time queue stats and failure alerts.',
    url: 'https://github.com/ozxc44/queue-monitor-dev',
    tags: ['queue', 'bull', 'redis', 'monitoring', 'background-jobs'],
    category: 'Developer Tools'
  },
  'email-cleanup': {
    name: 'Email Cleanup',
    description: 'Unsubscribe from newsletter spam in one click. Gmail OAuth bulk unsubscribe tool.',
    url: 'https://github.com/ozxc44/email-cleanup',
    tags: ['gmail', 'email', 'cleanup', 'unsubscribe', 'automation'],
    category: 'Productivity'
  },
  'form-to-pdf': {
    name: 'Form to PDF',
    description: 'Minimal form builder with auto PDF export. Self-hosted alternative to Typeform.',
    url: 'https://github.com/ozxc44/form-to-pdf',
    tags: ['forms', 'pdf', 'form-builder', 'jotform', 'typeform-alternative'],
    category: 'Developer Tools'
  },
  'tiktok-compliance-scanner': {
    name: 'TikTok Compliance Scanner',
    description: 'Scan videos for policy issues at scale. Automated content compliance scanner.',
    url: 'https://github.com/ozxc44/tiktok-compliance-scanner',
    tags: ['tiktok', 'video', 'compliance', 'moderation', 'automation'],
    category: 'Developer Tools'
  }
};

// Directory submission handlers
const DIRECTORIES = {
  'alternativeto': {
    name: 'AlternativeTo',
    url: 'https://alternativeto.net',
    submit: async (page, project) => {
      console.log(`  → Navigating to AlternativeTo...`);
      await page.goto('https://alternativeto.net/software/add', { waitUntil: 'networkidle' });

      // Check if login is required
      const loginRequired = await page.locator('input[name="username"], input[type="email"]').count() > 0;

      if (loginRequired) {
        console.log(`  ⚠️  Login required. Please create an account at https://alternativeto.net/account/register`);
        return { success: false, reason: 'login-required' };
      }

      // Fill form (selectors may vary)
      try {
        await page.fill('input[name="name"], #Name', project.name);
        await page.fill('textarea[name="description"], #Description', project.description);
        await page.fill('input[name="url"], #Url', project.url);

        if (project.demo) {
          await page.fill('input[name="website"], #Website', project.demo);
        }

        await page.fill('input[name="tags"], #Tags', project.tags.join(', '));

        console.log(`  ✓ Form filled, waiting for manual submission`);
        return { success: true, action: 'manual-submit' };
      } catch (error) {
        return { success: false, reason: error.message };
      }
    }
  },

  'saashub': {
    name: 'SaaSHub',
    url: 'https://www.saashub.com',
    submit: async (page, project) => {
      console.log(`  → Navigating to SaaSHub...`);
      await page.goto('https://www.saashub.com/submit', { waitUntil: 'networkidle' });

      // Check for login
      const loginRequired = await page.locator('a[href*="login"], a[href*="sign-in"]').count() > 0;

      if (loginRequired) {
        console.log(`  ⚠️  Login required at https://www.saashub.com/users/sign_up`);
        return { success: false, reason: 'login-required' };
      }

      try {
        // SaaSHub submission form
        await page.fill('input[name="product[name]"], #product_name', project.name);
        await page.fill('textarea[name="product[description]"], #product_description', project.description);
        await page.fill('input[name="product[website]"], #product_website', project.url);

        console.log(`  ✓ Form filled, waiting for manual submission`);
        return { success: true, action: 'manual-submit' };
      } catch (error) {
        return { success: false, reason: error.message };
      }
    }
  },

  'devhunt': {
    name: 'DevHunt',
    url: 'https://devhunt.org',
    submit: async (page, project) => {
      console.log(`  → Navigating to DevHunt...`);
      await page.goto('https://devhunt.org/submit', { waitUntil: 'networkidle' });

      const loginRequired = await page.locator('button:has-text("Login"), a:has-text("Login")').count() > 0;

      if (loginRequired) {
        console.log(`  ⚠️  Login required at https://devhunt.org (use GitHub OAuth)`);
        return { success: false, reason: 'login-required' };
      }

      try {
        await page.fill('input[name="name"], input[placeholder*="name" i]', project.name);
        await page.fill('textarea[name="description"], textarea[placeholder*="description" i]', project.description);
        await page.fill('input[name="url"], input[placeholder*="url" i]', project.url);
        await page.fill('input[name="tags"], input[placeholder*="tags" i]', project.tags.join(', '));

        console.log(`  ✓ Form filled, waiting for manual submission`);
        return { success: true, action: 'manual-submit' };
      } catch (error) {
        return { success: false, reason: error.message };
      }
    }
  },

  'indiehackers': {
    name: 'Indie Hackers',
    url: 'https://www.indiehackers.com',
    submit: async (page, project) => {
      console.log(`  → Navigating to Indie Hackers...`);
      await page.goto('https://www.indiehackers.com/products/new', { waitUntil: 'networkidle' });

      const loginRequired = await page.locator('a[href*="login"], button:has-text("Sign")').count() > 0;

      if (loginRequired) {
        console.log(`  ⚠️  Login required at https://www.indiehackers.com (use GitHub OAuth)`);
        return { success: false, reason: 'login-required' };
      }

      try {
        await page.fill('input[name="name"]', project.name);
        await page.fill('textarea[name="description"]', project.description);
        await page.fill('input[name="website"]', project.url);

        console.log(`  ✓ Form filled, waiting for manual submission`);
        return { success: true, action: 'manual-submit' };
      } catch (error) {
        return { success: false, reason: error.message };
      }
    }
  }
};

// Main submission function
async function submitProject(projectName, directoryName = null) {
  const project = PROJECTS[projectName];
  if (!project) {
    console.error(`❌ Project not found: ${projectName}`);
    console.log(`Available projects: ${Object.keys(PROJECTS).join(', ')}`);
    return;
  }

  console.log(`\n🚀 Submitting ${project.name}...`);
  console.log(`   URL: ${project.url}`);
  console.log(`   Tags: ${project.tags.join(', ')}`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  const directories = directoryName
    ? { [directoryName]: DIRECTORIES[directoryName] }
    : DIRECTORIES;

  const results = [];

  for (const [key, dir] of Object.entries(directories)) {
    console.log(`\n📝 ${dir.name}:`);
    try {
      const result = await dir.submit(page, project);
      results.push({ directory: dir.name, ...result });

      if (result.success) {
        console.log(`  ✅ ${result.action === 'manual-submit' ? 'Filled! Please review and submit.' : 'Submitted!'}`);
      } else {
        console.log(`  ❌ Failed: ${result.reason}`);
      }

      // Wait between submissions
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      results.push({ directory: dir.name, success: false, reason: error.message });
    }
  }

  await browser.close();

  // Summary
  console.log(`\n📊 Submission Summary for ${project.name}:`);
  console.log('─'.repeat(50));
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${result.directory}: ${result.success ? (result.action || 'Done') : result.reason}`);
  }
}

// CLI
const args = process.argv.slice(2);
const projectArg = args.find(a => a.startsWith('--project='))?.split('=')[1];
const allFlag = args.includes('--all');
const dirArg = args.find(a => a.startsWith('--directory='))?.split('=')[1];

async function main() {
  if (allFlag) {
    console.log(`🌟 Submitting all ${Object.keys(PROJECTS).length} projects...\n`);
    for (const projectName of Object.keys(PROJECTS)) {
      await submitProject(projectName, dirArg);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } else if (projectArg) {
    await submitProject(projectArg, dirArg);
  } else {
    console.log(`
📦 Directory Submitter — Auto-submit projects to software directories

Usage:
  node index.js --project=<project> [--directory=<dir>]
  node index.js --all [--directory=<dir>]

Projects:
  ${Object.keys(PROJECTS).join(', ')}

Directories:
  ${Object.keys(DIRECTORIES).join(', ')}

Examples:
  node index.js --project=badge-generator
  node index.js --project=status-badge-2 --directory=alternativeto
  node index.js --all
`);
  }
}

main().catch(console.error);
