export class validateEmailPage {
  constructor(page) {
    this.page = page;
    this.checkYourEmailMessage = page.getByText(
      "Verifică-ţi contul de e-mail, am trimis un mesaj de validare pe adresa:"
    );
    this.weSentYouMessage = page.getByRole("heading", {
      name: "Ți-am trimis un e-mail",
    });
    this.emailField = page.locator(".email");
    this.editEmailButton = page.locator(
      '[class="mat-focus-indicator mat-icon-button mat-button-base"]'
    );
    this.resendEmailButton = page.getByRole("button", { name: "Retrimite" });
    this.speakWithOceanTeamMessage = page.getByRole("heading", {
      name: "Vorbește cu echipa Ocean",
    });
    this.weAreHereMessage = page.getByText("Suntem aici pentru a te ajuta!");
    this.contactSupportButton = page.getByRole("button", {
      name: "Contactează suportul",
    });
    this.sideBarButton = page.getByRole("button").filter({ hasText: "dehaze" });
    this.sideBarFullName = page.locator('#full-name"');
    this.sideBarPhoneNum = page.locator("#phone-number");
    this.sideBarinviteFriendsButton = page.getByRole("link", {
      name: "Invită-ți prietenii",
    });
    this.sidebarHelpButton = page.locator("#contact-support");
    this.signOutButton = page.locator("#logout-button");
    this.findOutThePurposeMessage = page.getByText(
      "Află-ți scorul în Volt Descarcă Volt și află toate detaliile scorului tău FICO"
    );
    this.downloaddButton = page.getByRole("link", { name: "Descarcă Volt" });
    this.popUpTesendMessage = page.getByText(
      "Email-ul a fost retrimis Dacă nu îl găseşti verifică în SPAM. Dacă nu este acolo"
    );
    this.frameSuportOceanCredit = page
      .frameLocator('[id="fc_widget"]')
      .getByRole("link", {
        name: "Channel icon Suport Ocean Credit Bună ✋ Cu ce te pot ajuta azi? Scrie-mi întrebările sau nelămuririle tale aici.",
      });

    this.frameSupportMessage = page
      .frameLocator('[id="fc_widget"]')
      .getByText(
        "Bună ✋ Cu ce te pot ajuta azi? Scrie-mi întrebările sau nelămuririle tale aici."
      );
    this.frameMessageField = page
      .frameLocator('[id="fc_widget"]')
      .locator('[data-test-id="ui-editor"]');
    this.frameIformationMessage = page
      .frameLocator('[id="fc_widget"]')
      .getByText(
        "Don't miss out on any replies! Allow push notifications? Yes No"
      );
  }
  checkTheSuccessfulMessage = async () => {
    await this.weSentYouMessage.isVisible();
    await this.checkYourEmailMessage.isVisible();
  };
  pressTheChangeEmailButton = async () => {
    await this.editEmailButton.waitFor();
    await this.editEmailButton.click();
    await this.page.waitForURL(/\/mail-change/, { timeout: 3000 });
  };
  constactSuport = async () => {
    await this.contactSupportButton.waitFor();
    await this.page.waitForTimeout(2000);
    await this.contactSupportButton.click({ timeout: 3000 });
    await this.page.waitForTimeout(5000);
    await this.frameSuportOceanCredit.click();
    await this.page.waitForTimeout(3000);
    await this.frameSupportMessage.isVisible();
    await this.frameMessageField.focus();
    await this.frameMessageField.fill("Salut");
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
    await this.frameIformationMessage.isVisible();
  };
  sendAmessageToSupport = async () => {};
  InviteAfrend = async () => {
    await this.sideBarButton.waitFor();
    await this.sideBarButton.click();
    await this.sideBarinviteFriendsButton.waitFor();
    await this.sideBarinviteFriendsButton.click();
    await this.page.waitForURL(/\/invite-friends/);
  };
  signOut = async () => {
    await this.sideBarButton.waitFor();
    await this.sideBarButton.click();
    await this.signOutButton.waitFor();
    await this.signOutButton.click();
    await this.page.waitForURL(/\/fb/);
  };
  checkResendEmail = async () => {
    await this.resendEmailButton.waitFor();
    await this.resendEmailButton.click();
    await this.checkYourEmailMessage.waitFor();
  };
}
