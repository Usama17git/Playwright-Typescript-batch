import { test, expect, Page } from '@playwright/test';

// No runtime presence checks per user request — assert types to satisfy TypeScript
const LOGIN_USERNAME = process.env.LOGIN_USERNAME as string;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD as string;
const BASE_URL = process.env.BASE_URL as string;



test('login with env variables', async ({ page }) => {
  
  await navigateToLoginPage(page);
  await fillLoginForm(page, LOGIN_USERNAME, LOGIN_PASSWORD);
  await submitLoginForm(page);
  await verifySuccessfulLogin(page, LOGIN_USERNAME);
});

async function navigateToLoginPage(page: Page) {
  await page.goto(`${BASE_URL}/practice-test-login/`);
}

async function fillLoginForm(page: Page, username: string, password: string) {
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
}

async function submitLoginForm(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}

async function verifySuccessfulLogin(page: Page, username: string) {
  await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  await expect(page.locator('strong')).toContainText(`Congratulations ${username}. You successfully logged in!`);
}

