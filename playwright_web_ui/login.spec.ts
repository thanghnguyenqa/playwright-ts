import {Browser, expect, Locator, Page, test} from '@playwright/test'
import {chromium} from 'playwright'

test('login test', async({page, browserName}) => {
    // const browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    // const page:Page = await browser.newPage();
    var url:string = 'https://naveenautomationlabs.com/opencart/index.php?route=account/login';
    var mail:string = 'admin@mail.test';
    var pass:string = 'password';
    
    await page.goto(url);
    const mailId:Locator = await page.locator('#input-email');
    const passId:Locator = await page.locator('#input-password');
    const loginBtnId:Locator = await page.locator('input[type="submit"]');

    await mailId.fill(mail);
    await passId.fill(pass);
    await loginBtnId.click();

    const pageTitle = await page.title();
    console.log("Page Title: ", pageTitle);
    await page.screenshot({path: 'homepage.png'});
    expect(pageTitle).toEqual('My Account');
    console.log("Browser Name: ", browserName);

    // page.close()
    // browser.close();
})

test("test grep @smoke1", async() => {
    console.log("smoke1");
})

test("test grep 2 @smoke2", async() => {
    console.log("smoke2");
    
})