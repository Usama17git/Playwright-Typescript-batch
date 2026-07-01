import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameField = 'input[name="username"]';
  private readonly passwordField = 'input[name="password"]';
  private readonly submitButton = 'button[id="submit"]';
  private readonly successMessage = 'h1:has-text("Logged In Successfully")';
  private readonly errorMessage = '#error';
  private readonly logoutLink = 'a:has-text("Log out")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(url: string): Promise<void> {
    await this.goto(url);
  }

  /**
   * Fill username field
   * @param username - The username to enter
   */
  async fillUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameField, username);
  }

  /**
   * Fill password field
   * @param password - The password to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordField, password);
  }

  /**
   * Click the submit button
   */
  async clickSubmit(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  /**
   * Login with provided credentials
   * @param username - Username
   * @param password - Password
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  /**
   * Verify successful login message is visible
   */
  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
  }

  /**
   * Verify error message is visible
   */
  async verifyErrorMessage(): Promise<void> {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.page.locator(this.errorMessage).textContent() || '';
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.page.locator(this.successMessage).isVisible();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.locator(this.errorMessage).isVisible();
  }

  /**
   * Click logout link
   */
  async logout(): Promise<void> {
    await this.page.click(this.logoutLink);
  }

  /**
   * Check if username field exists
   */
  async isUsernameFieldPresent(): Promise<boolean> {
    return await this.page.locator(this.usernameField).isVisible();
  }

  /**
   * Get the URL of the page
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
