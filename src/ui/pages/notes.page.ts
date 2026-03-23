import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NotesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async createNote(title: string, description: string) {
    await this.page.fill('#title', title);
    await this.page.fill('#description', description);
    await this.page.click('#create-note');
  }

  async getNoteTitles() {
    return this.page.locator('.note-title').allTextContents();
  }
}