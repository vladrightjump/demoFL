const { test, expect } = require("@playwright/test");
import { welcomePage } from "../page-objects/welcomePage";
import { testData } from "../data/test-data";
import { AddPhoneNumberPage } from "../page-objects/addPhoneNumberPage";
import { veryfyPhonePage } from "../page-objects/verifyPhonePage";
import { validateEmailPage } from "../page-objects/validateEmailPage";
import { mailChangePage } from "../page-objects/mailChagePage";

test.describe("Negative Scenarios", () => {
  mode: "serial"; //parallel
  test.describe("Negative Scenarios", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });
    test("The user is using a wrong number", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.wrongNum1);
      await addphonenumberPage.checkTheErrorMessage(testData.wrongNumErorr);
    });
    test("The user is using a wrong number short ", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.wrongNum2);
      await addphonenumberPage.checkTheErrorMessage(testData.fillUpError);
    });
    test("Empty number field", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.pressContinuebutton();
      await addphonenumberPage.checkTheErrorMessage(testData.fillUpError);
    });

    test("The user has not accepted the Privacy Policy ", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.notAgreePrivacyPolicyAndContinue();
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
    });

    test("The user is using an wrong Validation Code", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.fillUptheWrongValditationCode(
        testData.wrongvalidationCode
      );
    });
    test("The user is using an wrong Validation Code short", async ({
      page,
    }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.fillUptheWrongValditationCode(
        testData.shortValidationCode
      );
    });
    test("No validation code is added", async ({ page }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.noCodeIsadded();
    });
    test("The user resets the validation code and enters the wrong one ", async ({
      page,
    }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.fillUptheWrongValditationCode(
        testData.wrongvalidationCode
      );
      await verifyphonePage.resendTheValidationCode();
      await verifyphonePage.fillUptheWrongValditationCode(
        testData.wrongvalidationCode
      );
    });
    test("An error message apears if user use the same email", async ({
      page,
    }) => {
      const welcomepage = new welcomePage(page);
      await welcomepage.nuAmFacebook();
      const addphonenumberPage = new AddPhoneNumberPage(page);
      await addphonenumberPage.checkTheElementsOnPage(testData.countryCode);
      await addphonenumberPage.addThePhoneNumber(testData.phoneNum1);
      await addphonenumberPage.agreePrivacyPolicyAndContinue();
      const verifyphonePage = new veryfyPhonePage(page);
      await verifyphonePage.fillUptheValditationCode(testData.validationCode);
      const emailpage = new validateEmailPage(page);
      await emailpage.checkTheSuccessfulMessage();
      await emailpage.pressTheChangeEmailButton();
      const changemailPage = new mailChangePage(page);
      await changemailPage.userfillUptEmail(testData.email);
    });
  });
});
