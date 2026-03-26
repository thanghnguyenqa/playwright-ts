import { test, expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import * as testData from "./testData/HomePage.testdata";

let homePage: HomePage;
let title: string;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoHomePage();
});

for (const [index, card] of testData.expectedCards.entries()) {
    test(`TC${index + 1} - Verify ${card} card is displayed`, { tag: '@verify_cards_homepage' }, async () => {
        await homePage.isVisible(card);
    })
};

testData.expectedUrlPath.forEach((path, index) => {
    test(`TC${index + 7} - Verify navigate to each card - ${path}`, { tag: '@homepage_navigate_action' }, async ({page}) => {
        switch (path) {
            case '/elements':
                await homePage.selectElementsSection();
                break;
            case '/forms':
                await homePage.selectFormsSection();
                break;
            case '/alertsWindows':
                await homePage.selectAlertsWindowsSection();
                break;
            case '/widgets':
                await homePage.selectWidgetsSection();
                break;
            case '/interaction':
                await homePage.selectInteractionsSection();
                break;
            case '/books':
                await homePage.selectBooksSection();
                break;
        }
        console.log('external link: ' + await homePage.getPath());
        await expect(page).toHaveURL(path);
    })
});
