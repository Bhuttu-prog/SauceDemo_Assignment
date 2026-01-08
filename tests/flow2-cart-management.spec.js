const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Flow 2: Cart Management + Session Behaviour', () => {
  test('should add two products, remove one, verify cart count, and test logout session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    
    await expect(productsPage.pageTitle).toBeVisible();
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    
    await productsPage.addProductByIndex(0);
    await productsPage.addProductByIndex(1);
    
   
    let cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(2);

    
    await productsPage.clickCartIcon();
    
    
    await expect(cartPage.pageTitle).toBeVisible();
    const cartTitle = await cartPage.getPageTitle();
    expect(cartTitle).toBe('Your Cart');
    
  
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
    
    
    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames.length).toBe(2);
    expect(cartItemNames[0]).toBeTruthy();
    expect(cartItemNames[1]).toBeTruthy();

    
    await cartPage.removeItem(0);

    
    itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
    
    
    const updatedCartItemNames = await cartPage.getCartItemNames();
    expect(updatedCartItemNames.length).toBe(1);
    
    
    await cartPage.clickContinueShopping();
    await expect(productsPage.pageTitle).toBeVisible();
    
    
    cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(1);

    
    await productsPage.logout();
    
    
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
   
    await page.goto('/cart.html');
    
    
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
   
    const currentUrl = page.url();
    expect(currentUrl).toContain('saucedemo.com');
    
    expect(currentUrl).not.toContain('cart.html');
  });
});

