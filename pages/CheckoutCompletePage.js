class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async getCompleteHeader() {
    return await this.completeHeader.textContent();
  }

  async getCompleteText() {
    return await this.completeText.textContent();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }

  async isSuccessMessageVisible() {
    const header = await this.completeHeader.textContent();
    return header && header.includes('Thank you');
  }
}

module.exports = { CheckoutCompletePage };

