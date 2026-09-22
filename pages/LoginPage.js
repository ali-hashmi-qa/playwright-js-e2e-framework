import { expect } from '@playwright/test';
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
        await super.goto('/');
    }
    async enterUsername(username) {
        await this.usernameInput.fill(username);
    }
    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }
    async clickLogin() {
        await this.loginButton.click();
    }
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
    async expectLoaded() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
    async expectErrorContains(text) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(text);
    }
}
