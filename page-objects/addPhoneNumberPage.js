import { expect } from "@playwright/test";
export class AddPhoneNumberPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator("ocean-header").getByRole("link");
    this.countryCode = page.getByText("+40");
    this.phoneNumberFiled = page.getByLabel("Număr de telefon *");
    this.dataPraivanciMessage = page.getByText(
      "!Toate datele tale personale sunt în siguranță și vor fi folosite doar în proces"
    );
    this.privacypolicyMessage = page.getByText(
      "Sunt de acord cu Politica de Confidențialitate"
    );
    this.privacypolicyCheckBox = page.locator(".mat-checkbox-inner-container");
    this.privacypolicyButton = page.locator("#privacy");
    this.pageFooterMessage = page.getByText(
      "© 2023 Ocean Credit IFN. Toate drepturile rezervate"
    );
    this.goToMainPageButton = page.getByRole("link", {
      name: "Pagina principală",
    });
    this.aboutUsButton = page.getByRole("link", { name: "Despre noi" });
    this.contactsButton = page.getByRole("link", { name: "Contacte" });
    this.blogButton = page.getByRole("link", { name: "Blog" });
    this.continueButton = page.getByRole("button", { name: "Continuă" });
    this.fillInYourNumberMessage = page.locator('[id="mat-error-0"]');
  }

  checkTheElementsOnPage = async (countryCode) => {
    await this.pageHeader.waitFor();
    const code = await this.countryCode.innerText();
    expect(code).toBe(countryCode);
    await this.privacypolicyButton.waitFor();
    await this.pageFooterMessage.waitFor();
    await this.goToMainPageButton.waitFor();
    await this.aboutUsButton.waitFor();
    await this.contactsButton.waitFor();
    await this.blogButton.waitFor();
  };
  addThePhoneNumber = async (phoneNumber) => {
    await this.phoneNumberFiled.waitFor();
    expect(this.phoneNumberFiled).toBeEmpty();
    await this.phoneNumberFiled.focus();
    expect(this.phoneNumberFiled).toBeFocused();
    await this.phoneNumberFiled.fill(phoneNumber);
  };
  agreePrivacyPolicyAndContinue = async () => {
    await this.dataPraivanciMessage.waitFor();
    await this.privacypolicyMessage.waitFor();
    await this.privacypolicyCheckBox.waitFor();
    expect(this.privacypolicyCheckBox).not.toBeChecked();
    await this.privacypolicyCheckBox.click();
    await this.continueButton.waitFor();
    await this.continueButton.click();
    await this.page.waitForURL(/\/verify-phone/);
  };
  checkTheErrorMessage = async (errorMessage) => {
    await this.dataPraivanciMessage.waitFor();
    await this.privacypolicyMessage.waitFor();
    await this.privacypolicyCheckBox.waitFor();
    expect(this.privacypolicyCheckBox).not.toBeChecked();
    await this.privacypolicyCheckBox.click();
    await this.continueButton.waitFor();
    await this.fillInYourNumberMessage.isVisible();
    const fillinNumberMessage = await this.fillInYourNumberMessage.innerText();
    await expect(fillinNumberMessage).toEqual(errorMessage);
  };
  notAgreePrivacyPolicyAndContinue = async () => {
    await this.dataPraivanciMessage.waitFor();
    await this.privacypolicyMessage.waitFor();
    await this.privacypolicyCheckBox.waitFor();
    expect(this.privacypolicyCheckBox).not.toBeChecked();
    // await this.privacypolicyCheckBox.click();
    await this.continueButton.waitFor();
    await this.continueButton.click();
    await this.page.waitForURL(/\/phone/);
  };
  pressContinuebutton = async () => {
    await this.continueButton.waitFor();
    await this.continueButton.click();
    await this.page.waitForURL(/\/phone/);
  };
}
