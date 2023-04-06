import { expect } from "@playwright/test";
export class veryfyPhonePage {
  constructor(page) {
    this.page = page;
    this.validationCodeField = page.getByRole("textbox");
    this.resendValidationCodeButton = page.getByRole("button", {
      name: "Retrimite codul",
    });
    this.headingMessage = page.getByRole("heading", {
      name: "Securizează-ți contul prin validarea numărului de telefon",
    });
    this.codeResendedMessage = page.getByText(
      "Cod retrimis Codul a fost retrimis pe numărul tău de telefon"
    );
  }
  fillUptheValditationCode = async (validationCode) => {
    await this.validationCodeField.waitFor();
    await this.headingMessage.waitFor();
    await this.validationCodeField.focus();
    expect(this.validationCodeField).toBeEmpty();
    expect(this.validationCodeField).toBeFocused();
    await this.page.keyboard.type(validationCode, { delay: 500 });
    await this.page.waitForURL(/\/validate-email/, { timeout: 3000 });
  };
  fillUptheWrongValditationCode = async (validationCode) => {
    await this.resendValidationCodeButton.waitFor();
    await this.validationCodeField.waitFor();
    await this.headingMessage.waitFor();
    await this.validationCodeField.focus();
    expect(this.validationCodeField).toBeEmpty();
    expect(this.validationCodeField).toBeFocused();
    await this.page.keyboard.type(validationCode, { delay: 500 });
    await this.page.waitForURL(/\/verify-phone/);
    await this.resendValidationCodeButton.waitFor();
    await this.validationCodeField.waitFor();
    await this.headingMessage.waitFor();
  };
  noCodeIsadded = async () => {
    await this.resendValidationCodeButton.waitFor();
    await this.validationCodeField.waitFor();
    await this.headingMessage.waitFor();
    await this.page.waitForURL(/\/verify-phone/);
  };
  resendTheValidationCode = async () => {
    await this.resendValidationCodeButton.waitFor();
    await this.resendValidationCodeButton.click();
    await this.resendValidationCodeButton.waitFor();
    await this.validationCodeField.waitFor();
    await this.headingMessage.waitFor();
    await this.validationCodeField.focus();
    expect(this.validationCodeField).toBeEmpty();
  };
  userPessonResendValidationCodeButton = async () => {
    await this.resendValidationCodeButton.waitFor();
    await this.resendValidationCodeButton.click();
    await this.codeResendedMessage.isVisible();
  };
}
