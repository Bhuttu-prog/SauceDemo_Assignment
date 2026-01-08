const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test.describe('Flow 1: Purchase Journey (Happy Path)', () => {
  test('should complete full purchase flow from login to order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    
    await expect(productsPage.pageTitle).toBeVisible();
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');

   
    await productsPage.addProductByIndex(0);
    
    
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(1);

    
    await productsPage.clickCartIcon();
    
    
    await expect(cartPage.pageTitle).toBeVisible();
    const cartTitle = await cartPage.getPageTitle();
    expect(cartTitle).toBe('Your Cart');
    
    
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    
    await cartPage.clickCheckout();

    
    await expect(checkoutPage.pageTitle).toBeVisible();
    const checkoutTitle = await checkoutPage.getPageTitle();
    expect(checkoutTitle).toBe('Checkout: Your Information');
    
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();

    
    await expect(checkoutOverviewPage.pageTitle).toBeVisible();
    const overviewTitle = await checkoutOverviewPage.getPageTitle();
    expect(overviewTitle).toBe('Checkout: Overview');
    
    await checkoutOverviewPage.clickFinish();

    
    await expect(checkoutCompletePage.completeHeader).toBeVisible();
    const successHeader = await checkoutCompletePage.getCompleteHeader();
    expect(successHeader).toBe('Thank you for your order!');
    
    const successText = await checkoutCompletePage.getCompleteText();
    expect(successText).toContain('Your order has been dispatched');
  });
});

