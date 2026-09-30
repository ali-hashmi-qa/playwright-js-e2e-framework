import { test } from '../../lib/fixtures.js';

test(
  'homepage displays the Sauce Demo login form',
  { tag: ['@sanity', '@smoke', '@regression'] },
  async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  }
);
