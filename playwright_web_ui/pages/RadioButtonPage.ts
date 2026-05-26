import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { expectedCheckImpressiveRadioButtonMessage, expectedCheckYesRadioButtonMessage } from '../tests/testData/RadioButtonPage.testdata';

export class RadioButtonPage extends BasePage {

    private readonly url = "https://demoqa.com/radio-button";
    private readonly yesRadioBtn = 'input#yesRadio';
    private readonly impressiveRadioBtn = 'input#impressiveRadio';
    private readonly noRadioBtn = 'input#noRadio';
    private readonly messageResult = '.mt-3';

    constructor(page: Page) {
        super(page);
    }

    async gotoRadioButtonPage() {
        console.log("Navigated to Radio Button Page");
        await this.navigate(this.url);
    }

    async clickYesRadioBtn() {
        await this.verifyInitialStatus();
        await this.click(this.yesRadioBtn);
    }

    async verifyYesRadioBtn() {
        await this.verifyCheckedBtn(this.yesRadioBtn);
        await this.verifyUncheckBtn(this.impressiveRadioBtn);
        await this.verifyDisableBtn(this.noRadioBtn);
        const actualMsgResult = await this.getMessageResult();
        console.log('Result message: ' + actualMsgResult)
        await expect(actualMsgResult).toBe(expectedCheckYesRadioButtonMessage);
    }

    async clickImpressiveRadioBtn() {
        await this.verifyInitialStatus();
        await this.click(this.impressiveRadioBtn);
    }

    async verifyImpressiveRadioBtn() {
        await this.verifyCheckedBtn(this.impressiveRadioBtn);
        await this.verifyUncheckBtn(this.yesRadioBtn);
        await this.verifyDisableBtn(this.noRadioBtn);
        const actualMsgResult = await this.getMessageResult();
        console.log('Result message: ' + actualMsgResult)
        await expect(actualMsgResult).toBe(expectedCheckImpressiveRadioButtonMessage);
    }

    async verifyInitialStatus() {
        let radioBtnlist: string[] = [this.yesRadioBtn, this.impressiveRadioBtn, this.noRadioBtn];

        radioBtnlist.forEach(element => {
            this.verifyUncheckBtn(element);
        });
        this.verifyDisableBtn(this.noRadioBtn);
    }

    async verifyUncheckBtn(element: string) {
        const elementLabel = await this.page.locator(element + ' + label').innerText();
        const errorMsg = `Validation Failed: Expected the "${elementLabel}" radio button to`
            + ` be visible and unchecked, but it is currently checked or hidden.`
        await expect(this.page.locator(element), errorMsg).not.toBeChecked();
    }

    async verifyDisableBtn(element: string) {
        const elementLabel = await this.page.locator(element).innerText();
        const errorMsg = `Validation Failed: Expected the "${elementLabel}" radio button to`
            + ` be visible and disabled, but it is currently enabled or hidden.`
        await expect(this.page.locator(element), errorMsg).toBeDisabled();
    }

    async verifyCheckedBtn(element: string) {
        const elementLabel = await this.page.locator(element).innerText();
        const errorMsg = `Validation Failed: Expected the "${elementLabel}" radio button to`
            + ` be visible and checked, but it is currently unchecked or hidden.`
        await expect(this.page.locator(element), errorMsg).toBeChecked();
    }

    async getMessageResult() {
        const texts = await this.page.locator(this.messageResult).allTextContents();
        const result = texts.join(' ').trim();
        return result;
    }
}