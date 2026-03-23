import { test as base } from '@playwright/test';
import { NotesAPI } from '../api/clients/notes.api';

export const test = base.extend<{
  notesApi: NotesAPI;
}>({
  notesApi: async ({}, use) => {
    const api = new NotesAPI();
    await api.init();
    await use(api);
  },
});