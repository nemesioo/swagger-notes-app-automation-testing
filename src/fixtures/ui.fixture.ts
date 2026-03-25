import { test as base, request } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { NotesPage } from '../ui/pages/notes.page';
import { RegisterPage } from '../ui/pages/register.page';

export const test = base.extend<{
  loginPage: LoginPage;
  notesPage: NotesPage;
  registerPage: RegisterPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  notesPage: async ({ page }, use) => {
    await use(new NotesPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect } from '@playwright/test';