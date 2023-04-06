export class welcomePage {
  constructor(page) {
    this.page = page;
    this.mesajSalut = page.getByRole("heading", { name: "Salut!" });
    this.intraSauInregistreazateMesaj = page.getByText(
      "Intră în cont sau înregistrează-te"
    );
    this.facebookButton = page.getByRole("button", {
      name: "Vreau banii în câteva ore",
    });
    this.nuamFacebookButton = page.getByText(
      "Nu am Facebook, iau banii în câteva zile"
    );
  }
  nuAmFacebook = async () => {
    await this.mesajSalut.waitFor();
    await this.intraSauInregistreazateMesaj.waitFor();
    await this.nuamFacebookButton.waitFor();
    await this.nuamFacebookButton.click();
    await this.page.waitForURL(/\/phone/, { timeout: 3000 });
  };
  iHaveFacebook = async () => {
    await this.mesajSalut.waitFor();
    await this.intraSauInregistreazateMesaj.waitFor();
    await this.facebookButton.waitFor();
    await this.facebookButton.click();
  };
}
