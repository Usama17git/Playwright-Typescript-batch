import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { USERNAME, PASSWORD } from '../Fixtures/Constants';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';

test.describe('Login Tests with Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(LOGIN_URL);
  });

  test('Should allow user to log in with valid credentials', async () => {
    // Use POM methods
    await loginPage.login(USERNAME, PASSWORD);
    
    // Verify successful login
    await loginPage.verifySuccessfulLogin();
    expect(await loginPage.isSuccessMessageVisible()).toBeTruthy();
  });

  test('Should not allow user to log in with invalid username', async () => {
    await loginPage.login('incorrectuser', PASSWORD);
    
    // Wait for error message to appear
    await loginPage.wait(2000);

    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
  });

  test('Should not allow user to log in with invalid password', async () => {
    await loginPage.login(USERNAME, 'Password12345');
    
    // Wait for error message to appear
    await loginPage.wait(2000);

    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
  });

  test('Should display error with empty credentials', async () => {
    await loginPage.clickSubmit();
    
    // Wait for error message to appear
    await loginPage.wait(2000);

    const errorVisible = await loginPage.isErrorMessageVisible();
    expect(errorVisible).toBeTruthy();
  });

  test('Should have correct page URL', async () => {
    const url = await loginPage.getCurrentUrl();
    expect(url).toContain('practice-test-login');
  });
});
