import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/ui.fixture';
import { notePayload } from '../../src/test-data/notes.data';

test.describe('Notes Create Read Update Delete', () => {

  test.beforeEach(async ({ notesPage, loginPage, page }) => {
    await notesPage.navigate('notes/app/login');
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/.*\/notes\/app/);
  });

  test('should create and validate note', async ({ notesPage,}) => {
    await expect(notesPage.noteCard.first()).toBeVisible();
    const noteCardCountBefore = await notesPage.getNoteCardCount();
    notesPage.click(notesPage.addNote);
    await expect(notesPage.noteDialog).toBeVisible({ timeout: 7000 });
    await notesPage.fillNoteForm();
    await expect
      .poll(async () => await notesPage.getNoteCardCount())
      .toBe(noteCardCountBefore + 1);
  });

  test('should view, update and delete note', async ({notesPage, page}) => {
    await expect(notesPage.noteCard.first()).toBeVisible();
    const card = await notesPage.getRandomCard();
    const cardViewButton = card.getByTestId('note-view');

    //Click the View button
    await notesPage.click(cardViewButton);
    await expect(page).toHaveURL(/\/notes\/app\/notes\/[a-z0-9]+$/);

    //Update the note
    await expect(notesPage.noteCard.first()).toBeVisible();
    const timeBefore = await notesPage.noteCardUpdatedAt.textContent();
    await notesPage.click(notesPage.noteCardEditButton);
    await expect(notesPage.noteDialog).toBeVisible({ timeout: 7000 });
    await notesPage.fillNoteForm();
    await expect(notesPage.noteCard.first()).toBeVisible();
    await expect(notesPage.noteCardUpdatedAt).not.toHaveText(timeBefore!);

    //Delete the note
    await notesPage.click(notesPage.noteCardDeleteButton);
    await expect(notesPage.noteDialog).toBeVisible({ timeout: 7000 });
    await notesPage.click(notesPage.noteDialogDeleteButton);
    await expect(page).toHaveURL(/\/notes\/app/);

  });
});