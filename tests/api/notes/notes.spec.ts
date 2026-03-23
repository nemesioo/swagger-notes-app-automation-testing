import { expect } from "@playwright/test";
import { test } from "../../../src/fixtures/api.fixture";
import { notePayload } from "../../../src/test-data/notes.data";

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
  });

});