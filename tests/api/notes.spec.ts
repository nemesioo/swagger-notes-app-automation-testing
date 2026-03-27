import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/api.fixture";
import { notePayload } from "../../src/test-data/notes.data";
import { notesListSchema, noteSchema } from "../../src/api/schemas/notes.schema";
import { getRandomNote } from "../../src/utils/notes.helper";

test.describe('Notes API', () => {

  test('Create Note', async ({ notesApi }) => {
    const response = await notesApi.createNote(notePayload);

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.title).toBe(notePayload.title);
  });

  test('Get Notes', async ({ notesApi }) => {
    const response = await notesApi.getNotes();

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    const parsed = notesListSchema.safeParse(body.json());

    expect(parsed.success).toBe(true);

  });

  test('Edit Note', async ({ notesApi }) => {
    const firstNote = await getRandomNote(notesApi);
    const editNoteResponse = await notesApi.editNote(firstNote.id);
    expect(editNoteResponse.ok()).toBeTruthy();

  });

  test('Delete Note', async ({ notesApi }) => {
    const firstNote = await getRandomNote(notesApi);
    const response = await notesApi.deleteNote(firstNote.id);
    expect(response.ok()).toBeTruthy();
  });

});