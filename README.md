# SauceDemo Automation Testing Assignment

This repository contains automated test cases for the SauceDemo website (https://www.saucedemo.com) using Playwright framework.

## What Flows Are Automated

This project automates three complete user flows:

### Flow 1: Purchase Journey (Happy Path)
- **File**: `tests/flow1-purchase-journey.spec.js`
- **Steps**:
  1. Successful login with valid credentials
  2. Add at least one product to the cart
  3. Navigate to the cart and proceed to checkout
  4. Enter checkout information (first name, last name, postal code)
  5. Finish checkout and validate the success message/page
- **Validation**: Verifies complete purchase flow from login to order confirmation

### Flow 2: Cart Management + Session Behaviour
- **File**: `tests/flow2-cart-management.spec.js`
- **Steps**:
  1. Successful login
  2. Add two different products to the cart
  3. Remove one product from the cart
  4. Verify cart count and items reflect the changes correctly
  5. Logout and verify session behaviour by attempting to visit an authenticated page
- **Validation**: Ensures cart management works correctly and session is properly terminated on logout

### Flow 3: Negative Scenario - Invalid Login
- **File**: `tests/flow3-negative-login.spec.js`
- **Steps**:
  1. Attempt login using invalid username and/or password
  2. Validate appropriate error message is displayed
  3. Validate user is not logged in
- **Validation**: Includes multiple negative test cases for different invalid credential combinations

## Project Structure

```
SauceDemo/
├── pages/                      # Page Object Model classes
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── CheckoutOverviewPage.js
│   └── CheckoutCompletePage.js
├── tests/                      # Test files
│   ├── flow1-purchase-journey.spec.js
│   ├── flow2-cart-management.spec.js
│   └── flow3-negative-login.spec.js
├── TEST_CASES.md              # Manual test case design (Part A)
├── playwright.config.js       # Playwright configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## How to Install Dependencies

1. **Prerequisites**: 
   - Node.js (version 14 or higher)
   - npm (comes with Node.js)

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install:
   - Playwright framework
   - Chromium browser (automatically downloaded by Playwright)

## How to Run the Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests with UI mode (interactive):
```bash
npm run test:ui
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run a specific test file:
```bash
npx playwright test tests/flow1-purchase-journey.spec.js
```

### Run tests with specific browser:
```bash
npx playwright test --project=chromium
```

## Test Reports

After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Assumptions Made

1. **Credentials**: Using standard test credentials (`standard_user` / `secret_sauce`) as provided by SauceDemo
2. **Product Selection**: Tests add products by index (first, second product) rather than by specific name, as product inventory may vary
3. **Error Messages**: Assuming SauceDemo displays error messages in a consistent format
4. **Session Management**: Assuming SauceDemo redirects unauthenticated users to login page when accessing protected routes
5. **Checkout Data**: Using sample data (John Doe, 12345) for checkout information
6. **Browser**: Tests run on Chromium browser as specified in requirements

## Known Limitations

1. **Product Names**: Tests use index-based selection rather than hardcoded product names, which makes them more flexible but less specific
2. **Network Conditions**: Tests don't account for slow network conditions or timeouts beyond default Playwright settings
3. **Concurrent Execution**: Tests are designed to run independently, but some may share similar setup steps
4. **Browser Compatibility**: Only tested on Chromium as per requirements; not tested on Firefox or WebKit
5. **Visual Validation**: No visual regression testing included; only functional validations

## Code Structure Highlights

- **Page Object Model (POM)**: Each page has its own class with reusable methods
- **Proper Waits**: Using Playwright's built-in auto-waiting instead of hardcoded timeouts
- **Clear Assertions**: Each test step includes explicit assertions to validate expected behavior
- **Modular Design**: Page objects are separated from test logic for maintainability
- **Descriptive Test Names**: Test names clearly describe what they're testing

## Optional: Debugging Mindset Question

**"If one of these tests stops working someday, what could be the possible reasons, and how would you fix them?"**

### Possible Reasons:

1. **UI Changes**: 
   - Selectors might have changed (class names, IDs, structure)
   - **Fix**: Update selectors in Page Object classes, use more stable selectors (data-test attributes if available)

2. **Application Behavior Changes**:
   - Flow might have changed (e.g., new step in checkout)
   - **Fix**: Review application manually, update test steps and page objects accordingly

3. **Timing Issues**:
   - Elements loading slower than expected
   - **Fix**: Add explicit waits, use `waitForSelector` or `waitForLoadState`

4. **Environment Issues**:
   - Network problems, server down, or slow response
   - **Fix**: Check network connectivity, verify application is accessible, add retry logic

5. **Browser/Driver Issues**:
   - Playwright update causing compatibility issues
   - **Fix**: Update Playwright version, check release notes, verify browser versions

6. **Data Issues**:
   - Test data might be invalid or changed
   - **Fix**: Verify test credentials, check if test data is still valid

7. **Session/Cookie Issues**:
   - Session management changed
   - **Fix**: Clear cookies before tests, check authentication flow

### How to Debug:

1. **Run in headed mode** to see what's happening: `npm run test:headed`
2. **Use debug mode** to step through: `npm run test:debug`
3. **Check test reports** for screenshots and error details
4. **Add console logs** temporarily to understand flow
5. **Inspect elements** manually in browser to verify selectors
6. **Check Playwright trace** if enabled in config
7. **Review error messages** carefully - they often point to the issue

## Contact

For questions or issues, please refer to the test case design document (`TEST_CASES.md`) for manual test scenarios.
