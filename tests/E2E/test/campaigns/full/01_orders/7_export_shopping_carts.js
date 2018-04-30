const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ShoppingCarts} = require('../../../selectors/BO/order');
const orderCommonScenarios = require('../../common_scenarios/order');
let promise = Promise.resolve();
scenario('Export shopping carts in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');
  scenario('Check the similarity between the contents of the file and the shopping carts', client => {
    test('should go to "Shopping cart" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.shopping_carts_submenu));
    test('should search the customer ', () => client.searchByValue(ShoppingCarts.customer_search_input, ShoppingCarts.search_button, 'DOE'));
    test('should check the similarity between the contents of the file and the shopping carts', () => {
      return promise
        .then(() => client.getShoppingCartNumber(ShoppingCarts.id_shopping_carts))
        .then(() => orderCommonScenarios.checkShoppingCarts())
        .then(() => orderCommonScenarios.checkSimilarity());
    });
  }, 'order');
}, 'order');
