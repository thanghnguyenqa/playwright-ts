import { test, expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;
const expectedCards = [
    'Elements',
    'Forms',
    'Alerts, Frame & Windows',
    'Widgets',
    'Interactions',
    'Book Store Application'
];
const expectedUrlPath = [
    '/elements',
    '/forms',
    '/alertsWindows',
    '/widgets',
    '/interaction',
    '/books'
];
const baseUrl: string = 'https://demoqa.com/';
let title: string;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoHomePage();
});

for (const [index, card] of expectedCards.entries()) {
    test(`TC${index + 1} - Verify ${card} card is displayed`, { tag: '@verify_cards_homepage' }, async () => {
        await expect(homePage.getCardByText(card)).toBeVisible();
    })
};

expectedUrlPath.forEach((path, index) => {
    test(`TC${index + 7} - Verify navigate to each card - ${path}`, { tag: '@homepage_navigate_action' }, async () => {
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
        await expect(await homePage.getPath()).toBe(path);
    })
});
