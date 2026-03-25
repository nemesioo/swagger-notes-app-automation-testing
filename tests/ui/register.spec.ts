import { APP_URL, REGISTER_ENDPOINT } from '../../src/constants/endpoints';
import { test } from '../../src/fixtures/ui.fixture';
import { expect } from '@playwright/test';

test.describe('Register Username Password Flow', () => {

    test.beforeEach(async ({ registerPage }) => {
        await registerPage.navigate(APP_URL + REGISTER_ENDPOINT);
    });

    test('should display error message for invalid input', async ({ registerPage, page }) => {
        // Attempt to register with empty fields
        registerPage.register();
        await expect(page.getByText(/is required/)).toHaveCount(4);

        //Attempt to register with invalid email
        await registerPage.emailInput.fill('invalid-email');
        await registerPage.registerButton.click();
        await expect(page.getByText(/is invalid/)).toBeVisible();

        //Attempt to register with less than 4 character name
        await registerPage.nameInput.fill('joe');
        await registerPage.registerButton.click();
        await expect(page.getByText(/should be between 4 and 30 characters/)).toBeVisible();
        //Attempt to register with more than 30 character name
        await registerPage.nameInput.fill('john doe john doe john doe john doejohn doe john doejohn doe john doejohn doe john doejohn doe john doejohn doe john doejohn doe john doe');
        await registerPage.registerButton.click();
        await expect(page.getByText(/should be between 4 and 30 characters/)).toBeVisible();

        //Attempt to register with less than 6 character password
        await registerPage.passwordInput.fill('12345');
        await registerPage.registerButton.click();
        await expect(page.getByText(/should be between 6 and 30 characters/)).toBeVisible();
        //Attempt to register with more than 30 character password
        await registerPage.passwordInput.fill('1234567890123456789012345678901234567890');
        await registerPage.registerButton.click();
        await expect(page.getByText(/should be between 6 and 30 characters/)).toBeVisible();

        //Attemp to register with non-matching passwords
        await registerPage.passwordInput.fill('password123');
        await registerPage.confirmPasswordInput.fill('password321');
        await registerPage.registerButton.click();
        await expect(page.getByText(/Passwords don't match!/)).toBeVisible();
    });

    test('should go to login when clicking the Log in here!', async ({registerPage, page}) => {
        await registerPage.loginLink.click();
        await expect(page).toHaveURL(/.*\/notes\/app\/login/);
    });

    test('should show account already exists', async ({ registerPage, page }) => {
        const uniqueEmail = `ijonjvnt@sharebot.net`;
        await registerPage.register(uniqueEmail, 'Test User', 'password123', 'password123');
        await expect(page.getByText(/An account already exists with the same email address/)).toBeVisible();
    });

    test('should register successfully with valid input', async ({ registerPage, page }) => {
        const uniqueEmail = `ijonjvnt@sharebot.net`;
        await registerPage.register(uniqueEmail, 'Test User', 'password123', 'password123');
        await expect(page.getByText(/User account created successfully/)).toBeVisible();
    });
});