import { test, expect, Page } from '@playwright/test';
import { USERNAME , PASSWORD } from '../Fixtures/Constants';
import { BASE_URL } from '../Fixtures/urlConstants';

test('test', async ({ page }) => {


    //Navigate to login Page
    await navigateToLoginPage(page);


    // Fill in login form
    await fillLoginForm(page, USERNAME, PASSWORD);


    // Submit login form
    await submitLoginForm(page);

    // Verify successful login
    await verifySuccessfulLogin(page);

});



async function navigateToLoginPage(page : Page) {
    await page.goto(`${BASE_URL}/practice-test-login/`);
}

    async function fillLoginForm(page : Page, username: string, password: string) {
        await page.getByRole('textbox', { name: 'Username' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
    
    }

    async function submitLoginForm(page : Page) {
        await page.getByRole('button', { name: 'Submit' }).click();
    }

    async function verifySuccessfulLogin(page : Page) {
        await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
        await expect(page.getByRole('strong')) . toContainText ('Congratulations student. You successfully logged in!');  
    }

