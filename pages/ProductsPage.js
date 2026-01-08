class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async addProductToCart(productName) {
    const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addToCartButton = productItem.locator('button').filter({ hasText: 'Add to cart' });
    await addToCartButton.click();
  }

  async addProductByIndex(index) {
    const addToCartButtons = this.page.locator('button').filter({ hasText: 'Add to cart' });
    await addToCartButtons.nth(index).click();
  }

  async removeProductFromCart(productName) {
    const productItem = this.page.locator('.inventory_item').filter({ hasText: productName });
    const removeButton = productItem.locator('button').filter({ hasText: 'Remove' });
    await removeButton.click();
  }

  async removeProductByIndex(index) {
    const removeButtons = this.page.locator('button').filter({ hasText: 'Remove' });
    await removeButtons.nth(index).click();
  }

  async getCartCount() {
    const badge = await this.cartBadge.textContent();
    return badge ? parseInt(badge) : 0;
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  async getProductNames() {
    const productNames = await this.page.locator('.inventory_item_name').allTextContents();
    return productNames;
  }
}

module.exports = { ProductsPage };

