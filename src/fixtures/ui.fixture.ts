import { test as base } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { NotesPage } from '../ui/pages/notes.page';

export const test = base.extend<{
  loginPage: LoginPage;
  notesPage: NotesPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  notesPage: async ({ page }, use) => {
    await use(new NotesPage(page));
  },
});