const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const {OrderPage} = require('../../../selectors/BO/order');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
let promise = Promise.resolve();
scenario('Shopping carts delete', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');
  scenario('Add products to the cart in the Front Office', client => {
    scenario('Go to the Front Office', client => {
      test('should go to the "Front Office"', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1))
          .then(() => client.signInFO(AccessPageFO));
      });
    test('should set the language of shop to "English"', () => client.changeLanguage());
    }, 'order');
    scenario('Add products to the cart', client => {
    test('should go to the first product page', () => client.waitForExistAndClick(productPage.first_product));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "CONTINUE SHOPPING" button', () => client.waitForVisibleAndClick(CheckoutOrderPage.continue_shopping_button));
    test('should go to "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page, 1000));
    test('should go to the second product page', () => client.waitForExistAndClick(productPage.second_product));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "CONTINUE SHOPPING" button', () => client.waitForVisibleAndClick(CheckoutOrderPage.continue_shopping_button));
    test('should go to "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page, 1000));
    scenario('Logout from the Front Office', client => {
      test('should logout successfully from the Front Office', () => client.signOutFO(AccessPageFO));
    }, 'order');
    }, 'order');
  }, 'order');
 scenario('Delete the shopping cart in the Back Office', client => {
   scenario('Go to the back Office', client => {
     test('should go back to the Back office', () =>{
       return promise
         .then(() =>  client.switchWindow(0))
         .then(()  => client.signInBO(AccessPageBO));
     });
   }, 'order');
    scenario('Delete the shopping cart', client => {
      test('should go to "Shopping cart" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.shopping_carts_submenu));
      test('should check the content of "Order ID"', () => client.checkTextValue(OrderPage.check_order_id, 'Non ordered'));
      test('should click on "Dropdown" button', () => client.waitForExistAndClick(OrderPage.dropdown_button));
      test('should click on "Delete" action', () => client.waitForExistAndClick(OrderPage.delete_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Dropdown" button', () => client.waitForExistAndClick(OrderPage.dropdown_button));
      test('should click on "Delete" action', () => client.waitForExistAndClick(OrderPage.delete_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the red alert', () => client.checkTextValue(CatalogPage.danger_panel, '×\nAn error occurred during deletion.'));
    }, 'order');
  }, 'order');
}, 'order',true);
