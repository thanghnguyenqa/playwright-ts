import { Locator } from '@playwright/test';

export class FormField {
  constructor(
    private input: Locator,
    private label?: Locator
  ) {}

  async getLabel() {
    return this.label?.textContent();
  }

  async getPlaceholder() {
    return this.input.getAttribute('placeholder');
  }

  async getValue() {
    return this.input.inputValue();
  }

  async fill(value: string) {
    await this.input.fill(value);
  }
}