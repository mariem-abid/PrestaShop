const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {accountPage} = require('../../../selectors/FO/add_account_page');
const common_scenarios = require('../../common_scenarios/identity');
let promise = Promise.resolve();

scenario('Customer Identity', client => {
  scenario('Open the browser and access to the FO', client => {
    test('should open the browser', () => client.open());
    test('should access to FO', () => client.accessToFO(AccessPageFO));
    test('should change the FO language to english', () => client.changeLanguage());
  }, 'identity');
  scenario('The Customer Identity Page', client => {
    test('should show the customer form', () => {
      return promise
        .then(() => client.scrollWaitForExistAndClick(AccessPageFO.personal_info, 150, 2000))
        .then(() => client.waitAndSetValue(accountPage.signin_email_input, "pub@prestashop.com"))
        .then(() => client.waitAndSetValue(accountPage.signin_password_input, "123456789"))
        .then(() => client.waitForExistAndClick(AccessPageFO.login_button))
        .then(() => client.client.isExisting(accountPage.customer_form));
    });
    test('should refuse to save the customer if the wrong password is provided', () => {
      return promise
        .then(() => client.waitAndSetValue(accountPage.password_account_input, "wrongPassword"))
        .then(() => client.waitForExistAndClick(accountPage.save_account_button))
        .then(() => client.checkTextValue(accountPage.danger_alert, 'Could not update your information, please check your data.'));
    });
    test('should save the customer if the correct password is provided', () => {
      return promise
        .then(() => client.waitAndSetValue(accountPage.password_account_input, "123456789"))
        .then(() => client.waitForExistAndClick(accountPage.save_account_button))
        .then(() => client.checkTextValue(accountPage.success_alert, 'Information successfully updated.'));
    });
    test('should allow the customer to change their password', () => {
      return promise
        .then(() => client.waitAndSetValue(accountPage.password_account_input, "123456789"))
        .then(() => client.waitAndSetValue(accountPage.new_password_input, "newPassword"))
        .then(() => client.waitForExistAndClick(accountPage.save_account_button))
        .then(() => client.checkTextValue(accountPage.success_alert, 'Information successfully updated.'));
    });
    test('should allow the customer to use the new password', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageFO.sign_out_button))
        .then(() => client.waitAndSetValue(accountPage.signin_email_input, "pub@prestashop.com"))
        .then(() => client.waitAndSetValue(accountPage.signin_password_input, "newPassword"))
        .then(() => client.waitForExistAndClick(AccessPageFO.login_button))
        .then(() => client.waitAndSetValue(accountPage.password_account_input, "newPassword"))
        .then(() => client.waitAndSetValue(accountPage.new_password_input, "123456789"))
        .then(() => client.waitForExistAndClick(accountPage.save_account_button))
        .then(() => client.checkTextValue(accountPage.success_alert, 'Information successfully updated.'));
    });
    test('should logout', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageFO.sign_out_button))
        .then(() => client.waitForExistAndClick(AccessPageFO.logo_home_page))
        .then(() => client.changeLanguage());
    });
  }, 'identity');
  scenario('The guest form during checkout', client => {
    scenario('Add product to cart as a guest', client => {
      common_scenarios.initCheckout();
    }, 'identity');
    scenario('Fill the personal information step as a guest', client => {
      common_scenarios.fillGuestInfo();
    }, 'identity');
    scenario('There can be 2 guests using the same e-mail address', client => {
      scenario('Delete cookies', client => {
        test('should delete cookies', () => client.deleteCookie());
        test('should click on "Continue shopping', () => client.waitForExistAndClick(accountPage.continue_shopping));
      }, 'identity');
      scenario('Fill the personal information step', client => {
        common_scenarios.initCheckout();
      }, 'identity');
      scenario('Let another guest use the same e-mail address', client => {
        common_scenarios.fillGuestInfo();
      }, 'identity');
    }, 'identity');
    scenario('Updating the guest account during checkout', client => {
      test('should let the guest update their lastname', () => {
        return promise
          .then(() => client.waitForExistAndClick(accountPage.checkout_step))
          .then(() => client.waitAndSetValue(accountPage.lastname_input, "a Ghost"))
          .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
          .then(() => client.checkTextValue(accountPage.checkout_step, " PERSONAL INFORMATION", 'contain'));
      });
      test('should not let the guest change their email address to that of a real customer', () => {
        return promise
          .then(() => client.waitForExistAndClick(accountPage.checkout_step))
          .then(() => client.waitAndSetValue(accountPage.email_input, "pub@prestashop.com"))
          .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
          .then(() => client.checkTextValue(accountPage.alert_danger_email, "The email \"pub@prestashop.com\" is already used, please choose another one or sign in"));
      });
      test('should let the guest change their email address if not used by a customer', () => {
        return promise
          .then(() => client.waitAndSetValue(accountPage.email_input, "guest.guest@example.com"))
          .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
          .then(() => client.checkTextValue(accountPage.checkout_step, " PERSONAL INFORMATION", 'contain'));
      });
      test('should let the guest add a password to create an account', () => {
        return promise
          .then(() => client.waitForExistAndClick(accountPage.checkout_step))
          .then(() => client.waitAndSetValue(accountPage.password_account_input, "123456789"))
          .then(() => client.waitForExistAndClick(accountPage.customer_form_continue_button))
          .then(() => client.checkTextValue(accountPage.checkout_step, " PERSONAL INFORMATION", 'contain'));
      });
    }, 'identity');
  }, 'identity');
}, 'identity', true);
