import { test, expect } from "@playwright/test";
import { RadioButtonPage } from "../pages/RadioButtonPage";

let radioButtonPage: RadioButtonPage;

test.describe('Verify the Radio Button page', { tag: '@radio_button_page_verify' }, () => {
    test.beforeEach(async ({ page }) => {
        radioButtonPage = new RadioButtonPage(page);
        await radioButtonPage.gotoRadioButtonPage();
    });

    test('TC01 - Radio Button Page - Verify element visible', async() => {
        await radioButtonPage.verifyInitialStatus();
    })

    test('TC02 - Radio Button Page - Click on Yes radio button', async() => {
        await radioButtonPage.clickYesRadioBtn();
        await radioButtonPage.verifyYesRadioBtn();
    })

    test('TC03 - Radio Button Page - Click on Impressive radio button', async() => {
        await radioButtonPage.clickImpressiveRadioBtn();
        await radioButtonPage.verifyImpressiveRadioBtn();
    })
})






