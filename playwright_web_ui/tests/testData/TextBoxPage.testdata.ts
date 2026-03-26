import { TextBoxPage } from "../../pages/TextBoxPage";

export const testCases = [
    {
        name: 'TC02 - Verify user name input field',
        field: (p: TextBoxPage) => p.fullName,
        label: 'Full Name',
        placeholder: 'Full Name',
        value: 'Expected Full Name',
        output: (p: TextBoxPage) => p.getNameOutput(),
        prefix: 'Name:'
    },
    {
        name: 'TC03 - Verify email input field',
        field: (p: TextBoxPage) => p.email,
        label: 'Email',
        placeholder: 'name@example.com',
        value: 'expectedValue@mail.com',
        output: (p: TextBoxPage) => p.getEmailOutput(),
        prefix: 'Email:'
    },
    {
        name: 'TC04 - Verify current address input field',
        field: (p: TextBoxPage) => p.currentAddr,
        label: 'Current Address',
        placeholder: 'Current Address',
        value: 'Expected Current Address',
        output: (p: TextBoxPage) => p.getCurrentAddrOutput(),
        prefix: 'Current Address :'
    },
    {
        name: 'TC05 - Verify permanent address input field',
        field: (p: TextBoxPage) => p.permanentAddr,
        label: 'Permanent Address',
        value: 'Expected Permanent Address',
        output: (p: TextBoxPage) => p.getPermanentAddrOutput(),
        prefix: 'Permananet Address :'
    }
];

export const fullFieldsData = {
    nameValue: 'expected Full Name',
    emailValue: 'expectedValue@mail.com',
    currentAddrValue: 'expected Current Address',
    permanentAddrValue: 'expected Permenant Address'
}