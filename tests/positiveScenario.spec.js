// @ts-check
const { test, expect } = require("@playwright/test");
import { welcomePage } from "../page-objects/welcomePage";
import { testData } from "../data/test-data";
import { AddPhoneNumberPage } from "../page-objects/addPhoneNumberPage";
import { veryfyPhonePage } from "../page-objects/verifyPhonePage";
import { validateEmailPage } from "../page-objects/validateEmailPage";
import { mailChangePage } from "../page-objects/mailChagePage";

test.describe("Full e2e testing positive", () => {
  mode: "serial"; //parallel
  test.describe("navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });
    test("Full e2e journey", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.userPessonResendValidationCodeButton();
      await verifyphonePage.fillUptheValditationCode(testData.validationCode);
      const validateEmailpage = new validateEmailPage(page);
      await validateEmailpage.checkTheSuccessfulMessage();
      await validateEmailpage.checkResendEmail();
      await validateEmailpage.InviteAfrend();
      await validateEmailpage.signOut();
    });
    test("Trying to connect with facebook", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.iHaveFacebook();
    });
    test("User is able to chenge his email", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum2);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.fillUptheValditationCode(testData.validationCode);
      const emailpage = new validateEmailPage(page);
      await emailpage.checkTheSuccessfulMessage();
      await emailpage.pressTheChangeEmailButton();
      const changeMailPage = new mailChangePage(page);
      await changeMailPage.userfillUptEmail(testData.email);
    });
  });
});
