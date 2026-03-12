import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { FormField } from '../base/FormField';

export class TextBoxPage extends BasePage {

    readonly fullName: FormField;
    readonly email: FormField;
    readonly currentAddr: FormField;
    readonly permanentAddr: FormField;
    private readonly url = "https://demoqa.com/text-box";
    private readonly titleLocator = '.text-center';
    private readonly userNameLableLocator = '#userName-label';
    private readonly userNameLocator = '#userName';
    private readonly emailLableLocator = '#userEmail-label';
    private readonly emailLocator = '#userEmail';
    private readonly CurrentAddrLableLocator = '#currentAddress-label';
    private readonly CurrentAddrLocator = '#currentAddress';
    private readonly permenantAddrLableLocator = '#permanentAddress-label';
    private readonly permenantAddrLocator = '#permanentAddress';
    private readonly submitBtnLocator = '#submit';
    readonly nameOutputLocator = '#name';
    readonly emailOutputLocator = '#email';
    readonly currentAddrOutputLocator = 'p#currentAddress';
    readonly PermanentAddrOutputLocator = 'p#permanentAddress';

constructor(page: Page){
    super(page);
    this.fullName = new FormField(
        page.locator(this.userNameLocator),
        page.locator(this.userNameLableLocator)
    )
    this.email = new FormField(
        page.locator(this.emailLocator),
        page.locator(this.emailLableLocator)
    )
    this.currentAddr = new FormField(
        page.locator(this.CurrentAddrLocator),
        page.locator(this.CurrentAddrLableLocator)
    )
    this.permanentAddr = new FormField(
        page.locator(this.permenantAddrLocator),
        page.locator(this.permenantAddrLableLocator)
    )
}

    async gotoTextBoxPage(){
    console.log("Navigated to Text Box Page");
    await this.navigate(this.url);
}

    async getTitle(){
    console.log("Get page's title");
    return await this.getContentText(this.titleLocator);
}

    async clickSubmitBtn(){
    console.log("Clicked Submit button");
    await this.click(this.submitBtnLocator);
}

    async getNameOutput(){
    console.log("Get Output - Name field");
    return await this.getContentText(this.nameOutputLocator);
}
    async getEmailOutput(){
    console.log("Get Output - Email field");
    return await this.getContentText(this.emailOutputLocator);
}
    async getCurrentAddrOutput(){
    console.log("Get Output - Current Address field");
    return await this.getContentText(this.currentAddrOutputLocator);
}
    async getPermanentAddrOutput(){
    console.log("Get Output - Permanent Address field");
    return await this.getContentText(this.PermanentAddrOutputLocator);
}

    async inputFullFields(name: string, email: string, currentAddr: string, permenantAddr: string){
    console.log('Input to Full fields for form fields');
    await this.fullName.fill(name);
    await this.email.fill(email);
    await this.currentAddr.fill(currentAddr);
    await this.permanentAddr.fill(permenantAddr);
}

    async getAllOutput(){
    let output;
    console.log('Get Output - All fields:');
    return {
        outputName: await this.getNameOutput(),
        outputEmail: await this.getEmailOutput(),
        outputCurrentAddress: await this.getCurrentAddrOutput(),
        outputPermanentAddress: await this.getPermanentAddrOutput()
    }
}
    
}