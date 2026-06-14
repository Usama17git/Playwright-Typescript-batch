import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

type TestCase = { username: string; password: string; baseUrl: string };
const dataPath = path.resolve(__dirname, '../Fixtures/loginData.json');
const testCases: TestCase[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

for (const tc of testCases) {
  test(`login with ${tc.username}`, async ({ page }) => {
    await page.goto(`${tc.baseUrl}/practice-test-login/`);
    await page.getByRole('textbox', { name: 'Username' }).fill(tc.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(tc.password);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  });
}
