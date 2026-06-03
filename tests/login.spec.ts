import { test, expect } from '@playwright/test';


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



test('Should not allow user to log in with invalid username', async ({ page }) => {

  // Navigate to website
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    
    // Fill in invalid credentials
    await page.getByRole('textbox', { name: 'Username' }).fill('incorrectuser');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait a moment for error to appear
    await page.waitForTimeout(2000);

});


test('Should not allow user to log in with invalid Password', async ({ page }) => {

    // Navigate to website
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Fill in invalid credentials
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('Password12345');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.waitForTimeout(2000);
  });




