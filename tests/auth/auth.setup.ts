import { request } from '@playwright/test';

const AUTH_FILE = 'playwright/.auth/user.json';

export default async () => {
  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  const response = await context.post('/api/users/login', {
    data: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  });

  const body = await response.json();

  // Save token to env-like file OR inject into headers
  process.env.API_TOKEN = body.token;

  // Save storage state (optional if cookies used)
  await context.storageState({ path: AUTH_FILE });

  await context.dispose();
};