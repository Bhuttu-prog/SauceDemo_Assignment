class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.items = page.locator('.cart_item');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async getItemCount() {
    return await this.items.count();
  }
}

module.exports = { CheckoutOverviewPage };

