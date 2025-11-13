import { browser, $ } from '@wdio/globals'

const users = [
  {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  },
]

const pageSelectors = {
  usernameInputField: '[data-test="username"]',
  passwordInputField: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  pageTitle: '[class="login_logo"]',
  loggedInTitle: '[data-test="title"]',
  backpackItem: '[data-test="add-to-cart-sauce-labs-backpack"]',
  cartButton: '[data-test="shopping-cart-link"]',
  inventoryItem: '[data-test="inventory-item-name"]',
};

describe('Homepage', () => {
  it('Should see page title', async () => {
    await browser.url('https://www.saucedemo.com/')
    await expect($(pageSelectors.pageTitle)).toBeDisplayed();
  })

  it('Should see login form', async () => {
    await browser.url('https://www.saucedemo.com/')
    await expect($(pageSelectors.usernameInputField)).toBeDisplayed();
    await expect($(pageSelectors.passwordInputField)).toBeDisplayed();
    await expect($(pageSelectors.loginButton)).toBeDisplayed();
  });


  // TODO: some test became outdated. Update accordingly
  users.forEach((user) => {
    it(`Can login with ${user.username}`, async () => {
      await browser.url('https://www.saucedemo.com/')
      await expect($(pageSelectors.usernameInputField)).toBeDisplayed();
      await $(pageSelectors.usernameInputField).setValue(user.username);

      await expect($(pageSelectors.passwordInputField)).toBeDisplayed();
      await $(pageSelectors.passwordInputField).setValue(user.password);

      await expect($(pageSelectors.loginButton)).toBeDisplayed();
      await $(pageSelectors.loginButton).click();

      await expect($(pageSelectors.loggedInTitle)).toBeDisplayed();
      await expect($(pageSelectors.loggedInTitle)).toHaveText('Products');
    });
  });

  it('should add backpack item to the cart', async () => {
    const username = users[0].username;
    const password = users[0].password;

    await browser.url('https://www.saucedemo.com/')
    await expect($(pageSelectors.usernameInputField)).toBeDisplayed();
    await $(pageSelectors.usernameInputField).setValue(username);

    await expect($(pageSelectors.passwordInputField)).toBeDisplayed();
    await $(pageSelectors.passwordInputField).setValue(password);

    await expect($(pageSelectors.loginButton)).toBeDisplayed();
    await $(pageSelectors.loginButton).click();


    await expect($(pageSelectors.backpackItem)).toBeDisplayed();
    await $(pageSelectors.backpackItem).click();

    await expect($(pageSelectors.cartButton)).toBeDisplayed();
    await $(pageSelectors.cartButton).click();

    // TODO: make sure added item actually backpack
    await expect($(pageSelectors.inventoryItem)).toBeDisplayed();
  });
});
