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

`npm test` is an alias for `npx playwright test`. Both read `playwright.config.js` and run specs under `tests/`. Prefer the npm scripts in this README and in CI.

```bash
npm test                 # headless (default)
npm run test:headed      # headed browser
npm run test:debug       # Playwright Inspector
```

Equivalent CLI (same engine):

```bash
npx playwright test
npx playwright test --headed
npx playwright test --debug
```

HTML report (generated after a run):

```bash
npx playwright show-report
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
│       └── homepage.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## Application Under Test

[https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## Scripts

| Script | What it runs |
|---|---|
| `npm test` | `playwright test` — headless Chromium |
| `npm run test:headed` | `playwright test --headed` |
| `npm run test:debug` | `playwright test --debug` |
