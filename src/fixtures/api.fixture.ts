import { APIRequestContext, test as base, request } from '@playwright/test';
import { NotesAPI } from '../api/clients/notes.api';

export const test = base.extend<{
  api: APIRequestContext;
  notesApi: NotesAPI;
}>({
  notesApi: async ({ }, use) => {
    const api = new NotesAPI();
    await api.init();
    await use(api);
  },
});

export { expect } from '@playwright/test';