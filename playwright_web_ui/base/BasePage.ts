import { expect, Locator, Page } from '@playwright/test'

export class BasePage {

    readonly page: Page;
    readonly titleLocator = '.text-center';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
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

    async getTitle(){
        console.log("Get page's title");
    return await this.getContentText(this.titleLocator);
    }
}