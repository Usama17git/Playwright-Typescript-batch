import {test except, expect} from '@playwright/test';

test.describe('Negative Login Tests', () => {
test('Should not allow user to log in with invalid credentials', async ({ page }) => {

  // Navigate to website
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByRole('textbox', { name: 'Username' }).fill('student123');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password1234');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify error message
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
});
});