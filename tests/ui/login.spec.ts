import { test } from '../../src/fixtures/ui.fixture';
import { expect } from '@playwright/test';

test.describe('Login Username Password Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate('notes/app/login');
  });

  test('should login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/.*\/notes\/app/);
  });

  test('should display error message for invalid credentials', async ({ loginPage, page }) => {
    await loginPage.login(process.env.EMAIL!, 'invalid-password');
    await expect(page.getByText(/Incorrect email address or password/)).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ loginPage, page }) => {
    
    // Attempt to login with empty fields
    await loginPage.login('', '');
    await expect(page.getByText(/is required/)).toHaveCount(2);

    // Attempt to login with invalid email format
    await loginPage.login('invalid-email', 'password123');
    await expect(page.getByText(/is invalid/)).toBeVisible();

    //Attempt to login with less than 6 character password
    await loginPage.login(process.env.EMAIL!, '12345');
    await expect(page.getByText(/should be between 6 and 30 characters/)).toBeVisible();
    //Attempt to login with more than 30 character password
    await loginPage.login(process.env.EMAIL!, '1234567890123456789012345678901234567890');
    await expect(page.getByText(/should be between 6 and 30 characters/)).toBeVisible();
  });


});