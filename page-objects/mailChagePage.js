import { expect } from "@playwright/test";
export class mailChangePage {
  constructor(page) {
    this.page = page;
    this.EnterTheNewEmailMessage = page.getByRole("heading", {
      name: "Introdu noul e-mail",
    });
    this.emailField = page.getByLabel("E-mail *");
    this.cancelButton = page.getByRole("button", { name: "Anulează" });
    this.errorMessage = page.locator('[id="mat-error-3"]');
    this.continueButton = page.getByRole("button", { name: "Continuă" });
    this.errorMessageWeHavethisEmail = page.getByText(
      "E-mail introdus este utilizat"
    );
  }
  userfillUptEmail = async (email) => {
    await this.EnterTheNewEmailMessage.isVisible();
    await this.emailField.waitFor();
    await this.emailField.focus();
    expect(this.emailField).toBeEmpty();
    expect(this.emailField).toBeFocused();
    await this.emailField.fill(email);
    await this.continueButton.waitFor();
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
    if ((await this.errorMessageWeHavethisEmail.isVisible()) == false) {
      await this.page.waitForURL(/\/validate-email/, { timeout: 3000 });
    }
  };
  userDontEnterEmail = async () => {
    await this.EnterTheNewEmailMessage.isVisible();
    await this.emailField.waitFor();
    await this.emailField.focus();
    expect(this.emailField).toBeEmpty();
    expect(this.emailField).toBeFocused();
    await this.EnterTheNewEmailMessage.click();
    await this.errorMessage.isVisible();
  };
}
