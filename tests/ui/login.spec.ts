import { test } from '../../src/fixtures/ui.fixture';
import { expect } from '@playwright/test';

test.describe('UI Login Flow', () => {
  test('Login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.navigate('/login');
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL('/dashboard');
  });
});