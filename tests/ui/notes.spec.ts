import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/ui.fixture';
import { notePayload } from '../../src/test-data/notes.data';

test.describe('Notes UI', () => {
  test('Create and validate note', async ({ notesPage }) => {
    await notesPage.navigate('/notes');
    await notesPage.createNote(notePayload.title, notePayload.description);

    const titles = await notesPage.getNoteTitles();
    expect(titles).toContain(notePayload.title);
  });
});