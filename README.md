# Playwright JS E2E Framework

Playwright + JavaScript end-to-end UI automation, demonstrated against [Sauce Demo](https://www.saucedemo.com/).

This repo is built in small commits, the way an enterprise framework grows: project setup first, then page objects, fixtures, environment config, reporting, and CI.

---

## Prerequisites

- Node.js 18 or later
- npm

---

## Setup

```bash
git clone https://github.com/ali-hashmi-qa/playwright-js-e2e-framework.git
cd playwright-js-e2e-framework
npm install
npx playwright install
```

- `npm install` installs `@playwright/test`.
- `npx playwright install` downloads Chromium, Firefox, and WebKit.

---

## Run Tests

`npm test` is an alias for `npx playwright test --project=chromium`. Prefer npm scripts in this README and in CI.

```bash
npm test                 # Chromium, headless
npm run test:headed      # Chromium, headed
npm run test:debug       # Chromium, Playwright Inspector
npm run test:firefox     # Firefox
npm run test:webkit      # WebKit
npm run test:browsers    # Chromium + Firefox + WebKit
```

HTML report (generated after a run):

```bash
npx playwright show-report
```

On failure, Playwright writes screenshot, video, and trace under `test-results/`. Open a trace:

```bash
npx playwright show-trace test-results/<path-to-trace.zip>
```

---

## Project Structure

```text
playwright-js-e2e-framework/
├── pages/                 # page objects (next commits)
├── lib/                   # fixtures and shared helpers (next commits)
├── config/                # environment configuration (next commits)
├── tests/
│   └── smoke/
│       └── loginPage.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## Application Under Test

[https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## Browsers

`playwright.config.js` defines three projects:

| Project name | Device preset | Engine |
|---|---|---|
| `chromium` | Desktop Chrome | Chromium |
| `firefox` | Desktop Firefox | Firefox |
| `webkit` | Desktop Safari | WebKit |

Default scripts use Chromium. Cross-browser: `npm run test:browsers`.

---

## Scripts

| Script | What it runs |
|---|---|
| `npm test` | Chromium, headless |
| `npm run test:headed` | Chromium, headed |
| `npm run test:debug` | Chromium, Inspector |
| `npm run test:firefox` | Firefox |
| `npm run test:webkit` | WebKit |
| `npm run test:browsers` | All three browsers |
