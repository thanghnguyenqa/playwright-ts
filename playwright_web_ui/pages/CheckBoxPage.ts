import { expect, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { expectedCheckDocumentResultMessage, expectedCheckAllFilesResultMessage } from "../tests/testData/CheckBoxPage.testdata";

export class CheckBoxPage extends BasePage {

    private readonly url = "https://demoqa.com/checkbox";
    private readonly commonResultLocator = "div[id='result'] span";
    readonly expandHomeXpath = "//span[@role='checkbox' and @aria-label='Select Home']"
        + "/ancestor::div[@role='treeitem']/span[contains(@class,'rc-tree-switcher')]"
    readonly closeClass = "rc-tree-switcher rc-tree-switcher_close";
    readonly openClass = "rc-tree-switcher rc-tree-switcher_open";
    readonly openIconHomeLocator = "//span[@title='Home' and contains(@class,'rc-tree-node-content-wrapper-open')]";
    readonly closeIconHomeLocator = "//span[@title='Home' and contains(@class,'rc-tree-node-content-wrapper-close')]";
    readonly checkBoxLabels = {
        home: 'Select Home',
        desktop: 'Select Desktop',
        documents: 'Select Documents',
        downloads: 'Select Downloads'
    }

    constructor(page: Page) {
        super(page);
    }

    async goToCheckBoxPage() {
        console.log('Navigated to Check Box Page');
        await this.navigate(this.url);
    }

    private getCheckBox(label: string) {
        return this.page.getByLabel(label, { exact: true });
    }

    async check(label: string) {
        await this.expectedUnChecked(label);
        await this.getCheckBox(label).check();
        await this.expectedChecked(label);
    }

    async unCheck(label: string) {
        await this.expectedChecked(label);
        await this.getCheckBox(label).uncheck();
        await this.expectedUnChecked(label);
    }

    async expectedChecked(label: string) {
        await expect(this.getCheckBox(label),
            `Checkbox "${label}" should be CHECKED`
        ).toBeChecked();
    }

    async expectedUnChecked(label: string) {
        await expect(this.getCheckBox(label),
            `Checkbox "${label}" should be UNCHECKED`
        ).not.toBeChecked();
    }

    async isVisible(label: string) {
        await expect(this.getCheckBox(label),
            `Checkbox "${label}" should be visible`
        ).toBeVisible();
    }

    async isNotVisible(label: string) {
        await expect(
            this.getCheckBox(label),
            `Checkbox "${label}" should be NOT visible`
        ).not.toBeVisible();
    }

    async getResultMessage() {
        const texts = await this.page.locator(this.commonResultLocator).allTextContents();
        const result = texts.join(' ').trim();
        return result;
    }

    async verifyDefaultElementVisible() {
        let title = await this.getTitle();
        await expect(title).toBe('Check Box');
        await this.isVisible(this.checkBoxLabels.home);
        await this.expectedUnChecked(this.checkBoxLabels.home);
        await this.isNotVisible(this.checkBoxLabels.desktop);
        await this.isNotVisible(this.checkBoxLabels.documents);
        await this.isNotVisible(this.checkBoxLabels.downloads);
    }

    async verifyHomeChecked() {
        let homeLabel = this.checkBoxLabels.home;
        await this.check(homeLabel);
        await expect(await this.getResultMessage()).toBe(expectedCheckAllFilesResultMessage);
    }

    async verifyExpandSelectDocumentCheckBox() {
        let expandHomeLocator = this.page.locator(this.expandHomeXpath);
        let documentLabel = this.checkBoxLabels.documents;
        let homeLabel = this.checkBoxLabels.home;
        await expect(expandHomeLocator).toHaveClass(this.closeClass);
        await expandHomeLocator.click();
        await expect(expandHomeLocator).toHaveClass(this.openClass);
        for (const [key, value] of Object.entries(this.checkBoxLabels)){
            await this.isVisible(value);
            await this.expectedUnChecked(value);
        }
        await this.check(documentLabel);
        await this.expectedChecked(homeLabel);
        await expect(await this.getResultMessage()).toBe(expectedCheckDocumentResultMessage);
    }
}