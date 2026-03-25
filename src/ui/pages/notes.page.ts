import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NotesPage extends BasePage {

  readonly addNote: Locator;
  readonly noteDialog: Locator;
  readonly categorySelector: Locator;
  readonly noteCompletedCheckbox: Locator;
  readonly noteTitleTextBox: Locator;
  readonly noteDescriptionTextBox: Locator;
  readonly noteSubmitButton: Locator;

  readonly noteCard: Locator;
  readonly noteCardEditButton: Locator;
  readonly noteCardUpdatedAt: Locator;
  readonly noteCardDeleteButton: Locator;
  readonly noteDialogDeleteButton: Locator;


  constructor(page: Page) {
    super(page);
    this.addNote = page.getByTestId('add-new-note');
    this.noteDialog = page.getByRole('dialog',);
    this.categorySelector = this.noteDialog.getByTestId('note-category');
    this.noteCompletedCheckbox = this.noteDialog.getByTestId('note-completed');
    this.noteTitleTextBox = this.noteDialog.getByTestId('note-title');
    this.noteDescriptionTextBox = this.noteDialog.getByTestId('note-description');
    this.noteSubmitButton = this.noteDialog.getByTestId('note-submit');

    this.noteCard = page.getByTestId('note-card');
    this.noteCardEditButton = page.getByTestId('note-edit');
    this.noteCardDeleteButton = page.getByTestId('note-delete');
    this.noteCardUpdatedAt = page.getByTestId('note-card-updated-at');
    this.noteDialogDeleteButton = this.noteDialog.getByTestId('note-delete-confirm');

  }

  async fillNoteForm() {
    function randomText(wordCount: number) {
      const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet',
        'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor'
      ];

      return Array.from({ length: wordCount }, () =>
        words[Math.floor(Math.random() * words.length)]
      ).join(' ');
    }

    const options = ['Work', 'Personal', 'Other'];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    await this.categorySelector.selectOption(randomOption);
    await this.noteCompletedCheckbox.setChecked(Math.random() < 0.5);

    const title = randomText(3);
    const description = randomText(10);
    await this.noteTitleTextBox.fill(title);
    await this.noteDescriptionTextBox.fill(description);
    this.click(this.noteSubmitButton);

  }

  async getNoteCardCount() {
    return await this.noteCard.count();
  }

  async getRandomCard() {
    const noteCardCount = await this.getNoteCardCount();
    const randomIndex = Math.floor(Math.random() * noteCardCount);
    const selectedCard = this.noteCard.nth(randomIndex);
    return selectedCard;
  }

}