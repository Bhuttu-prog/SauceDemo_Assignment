class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButtons = page.locator('button').filter({ hasText: 'Remove' });
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    const itemNames = await this.page.locator('.inventory_item_name').allTextContents();
    return itemNames;
  }

  async removeItem(index) {
    await this.removeButtons.nth(index).click();
  }

  async removeItemByName(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    const removeButton = item.locator('button').filter({ hasText: 'Remove' });
    await removeButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async isItemInCart(itemName) {
    const itemNames = await this.getCartItemNames();
    return itemNames.includes(itemName);
  }
}

module.exports = { CartPage };

