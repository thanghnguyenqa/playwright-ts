import { test, expect } from "@playwright/test";
import { CheckBoxPage } from "../pages/CheckBoxPage";

let checkBoxPage: CheckBoxPage;

test.describe('Verify Check Box Page', { tag: '@check_box_page_verify' }, () => {
    test.beforeEach('Set up page', async ({ page }) => {
        checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goToCheckBoxPage();
    })

    test('TC01 - Check Box Page - Verify element visible', async () => {
        await checkBoxPage.verifyDefaultElementVisible();
    })

    test('TC02 - Check Box Page - Select Home checkbox', async () => {
        await checkBoxPage.verifyDefaultElementVisible();
        await checkBoxPage.verifyHomeChecked();
    })

    test('TC03 - Check Box Page - Expand and select document checkbox', async () => {
        await checkBoxPage.verifyDefaultElementVisible();
        await checkBoxPage.verifyExpandSelectDocumentCheckBox();
    })
})