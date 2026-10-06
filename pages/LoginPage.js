import { expect, test } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.logo = page.locator('.login_logo');
    }
    async goto() {
        await test.step('Open the login page', async () => {
            await super.goto('/');
        });
    }
    async enterUsername(username) {
        await test.step(`Enter username "${username}"`, async () => {
            await this.usernameInput.fill(username);
        });
    }
    async enterPassword(password) {
        await test.step('Enter password', async () => {
            await this.passwordInput.fill(password);
        });
    }
    async clickLogin() {
        await test.step('Click Login', async () => {
            await this.loginButton.click();
        });
    }
    async login(username, password) {
        await test.step(`Login as ${username}`, async () => {
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLogin();
        });
    }
    async expectLoaded() {
        await test.step('Login form is visible', async () => {
            await expect(this.usernameInput).toBeVisible();
            await expect(this.passwordInput).toBeVisible();
            await expect(this.loginButton).toBeVisible();
        });
    }
    async expectErrorContains(text) {
        await test.step(`Error message contains "${text}"`, async () => {
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toContainText(text);
        });
    }
}
