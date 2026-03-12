import { test, expect } from "@playwright/test";
import { TextBoxPage } from "../pages/TextBoxPage";
import { fullFieldsData, testCases } from "./testData/TextBoxPage.testdata";

let textBoxPage: TextBoxPage;

test.describe('Verify Text Box Page', { tag: '@text_box_page' }, () => {
    test.beforeEach(async ({ page }) => {
        textBoxPage = new TextBoxPage(page);
        await textBoxPage.gotoTextBoxPage();
    });

    test('TC01 - Text Box Page - Verify page title', async () => {
        let title = await textBoxPage.getTitle();
        await expect(title).toBe('Text Box');
    })



    for (const tc of testCases) {

        test(tc.name, async () => {
            const field = tc.field(textBoxPage);
            await expect(await field.getLabel()).toBe(tc.label);
            if (tc.placeholder) {
                await expect(await field.getPlaceholder()).toBe(tc.placeholder);
            }
            await field.fill(tc.value);
            await expect(await field.getValue()).toBe(tc.value);
            await textBoxPage.clickSubmitBtn();
            const output = await tc.output(textBoxPage);
            await expect(output).toBe(`${tc.prefix}${tc.value}`);
        });

    }
    
    test('TC06 - Verify submit with all emptied fields', async ({ page }) => {
        const EMPTY = '';
        const fields = [
            textBoxPage.fullName,
            textBoxPage.email,
            textBoxPage.currentAddr,
            textBoxPage.permanentAddr
        ];
        const placeholders = [
            testCases[0].placeholder,
            testCases[1].placeholder,
            testCases[2].placeholder
        ];
        const outputs = [
            textBoxPage.nameOutputLocator,
            textBoxPage.emailOutputLocator,
            textBoxPage.currentAddrOutputLocator,
            textBoxPage.PermanentAddrOutputLocator
        ];
        for (let i = 0; i < fields.length; i++) {
            await expect(await fields[i].getLabel()).toBe(testCases[i].label);
        }
   
        for (let i = 0; i < placeholders.length; i++) {
            await expect(await fields[i].getPlaceholder()).toBe(placeholders[i]);
        }
        for (const field of fields) {
            await expect(await field.getValue()).toBe(EMPTY);
        }
        await textBoxPage.clickSubmitBtn();

        for (const locator of outputs) {
            await expect(page.locator(locator)).toBeHidden();
        }
    });



    test('TC07 - Verify output when filling all form fields',{tag: '@test'}, async () => {
        let nameValue: string = fullFieldsData.nameValue;
        let emailValue: string = fullFieldsData.emailValue;
        let currentAddrValue: string = fullFieldsData.currentAddrValue;
        let permanentAddrValue: string = fullFieldsData.permanentAddrValue;
        await textBoxPage.inputFullFields(
            nameValue, 
            emailValue, 
            currentAddrValue, 
            permanentAddrValue
        );
        await textBoxPage.clickSubmitBtn();
        let result = await textBoxPage.getAllOutput();
        await expect(result.outputName).toBe(`Name:${nameValue}`);
        await expect(result.outputEmail).toBe(`Email:${emailValue}`);
        await expect(result.outputCurrentAddress).toBe(`Current Address :${currentAddrValue}`);
        await expect(result.outputPermanentAddress).toBe(`Permananet Address :${permanentAddrValue}`);
    })
})

