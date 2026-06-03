import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

test('Should allow user to log in with valid credentials', async ({ page }) => {

  // Navigate to website

  await page.goto('https://practicetestautomation.com/practice-test-login/');
 
  // Verify page title
    await page.getByRole('textbox', { name: 'Username' }).fill('student');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123'); 

await page.getByRole('button', { name: 'Submit' }).click();

    // Verify successful login
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();

    await page.getByRole('link', { name: 'Log out' })

});
});
