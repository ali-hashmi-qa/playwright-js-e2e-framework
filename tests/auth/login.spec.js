import { test } from '../../lib/fixtures.js';
import { loadTestData } from '../../lib/testData.js';

const users = loadTestData('users.json');
const loginCases = loadTestData('loginData.json');

function credentialsFor(testCase) {
  const baseUser = users[testCase.user];

  return {
    username: Object.hasOwn(testCase, 'username') ? testCase.username : baseUser.username,
    password: Object.hasOwn(testCase, 'password') ? testCase.password : baseUser.password,
  };
}

test.describe('Login', { tag: '@auth' }, () => {
  for (const testCase of loginCases) {
    test(testCase.title, { tag: testCase.tags }, async ({ loginPage, inventoryPage }) => {
      const { username, password } = credentialsFor(testCase);

      await loginPage.goto();
      await loginPage.login(username, password);

      if (testCase.outcome === 'success') {
        await inventoryPage.expectLoaded();
      } else {
        await loginPage.expectErrorContains(testCase.errorText);
      }
    });
  }
});
