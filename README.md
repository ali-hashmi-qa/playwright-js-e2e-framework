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
├── pages/
│   ├── BasePage.js         # shared goto / title
│   ├── LoginPage.js        # login form
│   └── InventoryPage.js    # product list after login
├── lib/                   # fixtures and shared helpers (next commits)
├── config/                # environment configuration (next commits)
├── tests/
│   ├── smoke/
│   │   └── loginForm.spec.js
│   └── auth/
│       └── login.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

---

## Page Objects

Tests describe behavior. Locators live in `pages/`.

```javascript
// tests do this
await loginPage.login(username, password);
await inventoryPage.expectLoaded();

// tests do not do this
await page.locator('#user-name').fill(username);
```

| Class | File | Role |
|---|---|---|
| `BasePage` | `pages/BasePage.js` | Shared `goto` / `title` |
| `LoginPage` | `pages/LoginPage.js` | Login form |
| `InventoryPage` | `pages/InventoryPage.js` | Product list after login |

Page objects are constructed in the spec (`new LoginPage(page)`). Commit 04 will inject them with custom fixtures.

---

## Fixtures

Specs import `test` from `lib/fixtures.js`, not from `@playwright/test`. Custom fixtures build page objects and inject them into the test.

```javascript
import { test } from '../../lib/fixtures.js';

test('standard user reaches inventory', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(username, password);
  await inventoryPage.expectLoaded();
});
```

| Fixture | Provides |
|---|---|
| `loginPage` | `new LoginPage(page)` |
| `inventoryPage` | `new InventoryPage(page)` |

Built-in fixtures such as `page` and `context` still work.

---

## Environments

`baseURL` and timeouts live in JSON. They are not hardcoded in tests.

| ENV | File | Typical use |
|---|---|---|
| `qa` (default) | `config/environments/qa.json` | Local and CI smoke |
| `staging` | `config/environments/staging.json` | Pre-prod |

```bash
npm test                 # ENV=qa
npm run test:staging     # ENV=staging
```

Copy `.env.example` to `.env` for a local default. `.env` is gitignored.

Sauce Demo exposes one public host, so QA and staging URLs match. In a real product those files would point at different servers.

`config/loadConfig.js` reads `process.env.ENV`, validates it, and loads the matching JSON. `playwright.config.js` uses `config.baseURL`.

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

---

## Run It

```bash
npm test
npm run test:headed
```

`npm test` is Chromium only. You should see:

- smoke → login form
- auth → successful login
- auth → invalid password

Three tests, all via POM.

Same 3 tests, 1 worker. Behavior is unchanged; construction moved into fixtures.

If you see `loginPage is not defined` or a fixture error, the spec is still importing `test` from `@playwright/test` instead of `lib/fixtures.js`.

```bash
npm run test:staging
```

Both `npm test` and `npm run test:staging` should pass. Staging may just feel slightly more patient on `expect`.

Broken env check:

```bash
cross-env ENV=prod npm test
```

This should print the unknown-ENV message and exit without running tests.
