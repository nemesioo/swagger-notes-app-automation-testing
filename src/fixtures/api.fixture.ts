import { APIRequestContext, test as base, request } from '@playwright/test';
import { NotesAPI } from '../api/clients/notes.api';

export const test = base.extend<{
  api: APIRequestContext;
  notesApi: NotesAPI;
}>({
  api: async ({ }, use) => {
    const apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    await use(apiContext);
  },
  notesApi: async ({ }, use) => {
    const api = new NotesAPI();
    await api.init();
    await use(api);
  },
});

export { expect } from '@playwright/test';