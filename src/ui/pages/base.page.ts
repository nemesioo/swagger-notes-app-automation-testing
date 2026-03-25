import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `reports/${name}.png` });
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();

    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }
}