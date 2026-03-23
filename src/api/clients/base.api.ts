import { APIRequestContext, request } from '@playwright/test';

export class BaseAPI {
  protected request!: APIRequestContext;

  async init() {
    this.request = await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
  }
}