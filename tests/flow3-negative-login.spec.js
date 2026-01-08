const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Flow 3: Negative Scenario - Invalid Login', () => {
  test('should display error message and prevent login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    
    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');

    
    await expect(loginPage.errorMessage).toBeVisible();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');

    
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    
   
    const currentUrl = page.url();
    expect(currentUrl).toContain('saucedemo.com');
    expect(currentUrl).not.toContain('inventory.html');
    
    
    const productsPageTitle = page.locator('.title');
    const isProductsPageVisible = await productsPageTitle.isVisible().catch(() => false);
    expect(isProductsPageVisible).toBe(false);
  });

  test('should display error message for invalid username with valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('wrong_username', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
    
    
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('should display error message for valid username with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
    
    
    await expect(loginPage.usernameInput).toBeVisible();
  });
});

