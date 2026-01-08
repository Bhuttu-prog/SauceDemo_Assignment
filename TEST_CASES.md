# Test Case Design - SauceDemo Automation

## Primary Flow: Login → Add Product to Cart → Checkout → Logout

### Test Cases

| Test Case ID | Scenario | Steps | Expected Result |
|--------------|----------|-------|-----------------|
| TC-001 | **Happy Path - Complete Purchase Flow** | 1. Navigate to saucedemo.com<br>2. Enter valid username (standard_user)<br>3. Enter valid password (secret_sauce)<br>4. Click Login<br>5. Add a product to cart<br>6. Click cart icon<br>7. Click Checkout<br>8. Enter first name, last name, postal code<br>9. Click Continue<br>10. Click Finish | User successfully completes purchase and sees "Thank you for your order!" message |
| TC-002 | **Cart Management - Add Multiple Items** | 1. Login with valid credentials<br>2. Add first product to cart<br>3. Add second different product to cart<br>4. Navigate to cart<br>5. Verify both items are present | Cart displays both products with correct names and prices |
| TC-003 | **Cart Management - Remove Item** | 1. Login with valid credentials<br>2. Add two products to cart<br>3. Navigate to cart<br>4. Remove one product<br>5. Verify cart count updates | Cart count decreases by 1, removed item no longer visible in cart |
| TC-004 | **Negative - Invalid Username** | 1. Navigate to saucedemo.com<br>2. Enter invalid username (wrong_user)<br>3. Enter valid password (secret_sauce)<br>4. Click Login | Error message "Epic sadface: Username and password do not match any user in this service" is displayed, user remains on login page |
| TC-005 | **Negative - Invalid Password** | 1. Navigate to saucedemo.com<br>2. Enter valid username (standard_user)<br>3. Enter invalid password (wrong_pass)<br>4. Click Login | Error message "Epic sadface: Username and password do not match any user in this service" is displayed, user remains on login page |
| TC-006 | **Edge Case - Empty Credentials** | 1. Navigate to saucedemo.com<br>2. Leave username and password fields empty<br>3. Click Login | Error message "Epic sadface: Username is required" is displayed |
| TC-007 | **Session Management - Unauthorized Access** | 1. Navigate directly to cart page URL without logging in<br>2. Attempt to access authenticated page | User is redirected to login page, cannot access cart |
| TC-008 | **Edge Case - Logout and Session End** | 1. Login with valid credentials<br>2. Add item to cart<br>3. Logout<br>4. Attempt to navigate back to cart page | User is redirected to login page, cart session is cleared |

---

## Notes

- **Primary Flow**: Login → Add Product → Checkout → Complete Purchase
- **Negative Test Cases**: TC-004, TC-005, TC-006
- **Edge Cases**: TC-006 (empty fields), TC-008 (session after logout)

