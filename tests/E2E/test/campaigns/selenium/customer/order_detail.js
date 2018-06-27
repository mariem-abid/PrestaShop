var CommonClient = require('../../../clients/common_client');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CheckoutOrderPage, CustomerAccount} = require('../../../selectors/FO/order_page');

scenario('Order history page', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the language of shop to "English"', () => client.changeLanguage());
  }, 'common_client');
  scenario('Display a list of orders', client => {
    test('should go to the customer account', () => client.waitForExistAndClick(CheckoutOrderPage.customer_name));
    test('should display a list of orders', () => client.waitForExistAndClick(CustomerAccount.order_history_button));
    test('should check that the list of orders is displayed', () => client.waitForVisible(CustomerAccount.orders_list));
  }, 'common_client');
  scenario('Display a list of orders', client => {
    test('should click on the "Details" button', () => client.waitForExistAndClick(CustomerAccount.details_button.replace("%NUMBER", 5)));
    test('should check that is the order details page', () => client.checkTextValue(CustomerAccount.order_details_words, "Order details"));
    test('should display order infos', () => client.waitForVisible(CustomerAccount.order_infos_block));
    test('should display order statuses', () => client.waitForVisible(CustomerAccount.order_status_block));
    test('should display invoice address', () => client.waitForVisible(CustomerAccount.invoice_address_block));
    test('should display order products', () => client.waitForVisible(CustomerAccount.order_products_block));
    test('should display the return button', () => client.waitForVisible(CustomerAccount.order_products_block));
    test('should add a message', () => client.waitAndSetValue(CustomerAccount.message_input, "Test message"));
    test('should click on the "SEND" button', () => client.waitForExistAndClick(CustomerAccount.send_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CustomerAccount.success_panel, 'Message successfully sent'));
  }, 'common_client');
}, 'common_client');
