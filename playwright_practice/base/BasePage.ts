import { Locator, Page } from '@playwright/test'

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async getPath(): Promise<string> {
        return new URL(this.page.url()).pathname;
    }

    async getContentText( locator: string ){
        return (await this.page.locator(locator).innerText()) ?? '';
    }
}