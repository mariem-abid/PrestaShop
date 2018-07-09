const {productPage} = require('../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../selectors/FO/order_page');
const {accountPage} = require('../../selectors/FO/add_account_page');
let promise = Promise.resolve();

module.exports = {
  initCheckout: function () {
    scenario('Add some product to cart"', client => {
      test('should add some product to cart"', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.waitForExistAndClick(productPage.first_product))
          .then(() => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button))
          .then(() => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button))
          .then(() => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button));
      });
    }, 'identity');
  },
  fillGuestInfo: function () {
    scenario('Fill guest info"', client => {
      test('should fill guest info"', () => {
        return promise
          .then(() => client.waitAndSetValue(accountPage.firstname_input, "I am"))
          .then(() => client.waitAndSetValue(accountPage.lastname_input, "a Guest"))
          .then(() => client.waitAndSetValue(accountPage.email_input, "guest@example.com"))
          .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
          .then(() => client.checkTextValue(accountPage.checkout_step, " PERSONAL INFORMATION", 'contain'));
      });
    }, 'identity');
  }
};

