import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HomePage extends BasePage {

    private readonly url = "https://demoqa.com/";
    private readonly cardLocator = '.card';
    private readonly elementsLocator = '.card:has-text("Elements")';
    private readonly formsLocator = '.card:has-text("Forms")';
    private readonly alertsWindowsLocator = '.card:has-text("Alerts, Frame & Windows")';
    private readonly widgetsLocator = '.card:has-text("Widgets")';
    private readonly interactionsLocator = '.card:has-text("Interactions")';
    private readonly booksLocator = '.card:has-text("Book Store Application")';
    
    constructor(page: Page){
        super(page);
    }

    getCardByText(card: string){
        return this.page.locator(this.cardLocator, {
            hasText: card
        });
    }

    async gotoHomePage(){
        console.log("Navigated to Home Page");
        await this.navigate(this.url);
    }

    async selectElementsSection(){
        console.log("Clicked on Element section");
        await this.click(this.elementsLocator);
    }

        async selectFormsSection(){
        console.log("Clicked on Forms section");
        await this.click(this.formsLocator);
    }

        async selectAlertsWindowsSection(){
        console.log("Clicked on AlertsWindows section");
        await this.click(this.alertsWindowsLocator);
    }

        async selectWidgetsSection(){
        console.log("Clicked on Widgets section");
        await this.click(this.widgetsLocator);
    }
    
    async selectInteractionsSection(){
        console.log("Clicked on Interactions section");
        await this.click(this.interactionsLocator);
    }

    async selectBooksSection(){
        console.log("Clicked on Interactions section");
        await this.click(this.booksLocator);
    }
}