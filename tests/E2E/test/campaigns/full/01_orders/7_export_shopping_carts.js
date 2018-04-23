const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ShoppingCarts} = require('../../../selectors/BO/order');
let promise = Promise.resolve();

scenario('Export shopping carts in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');
  scenario('Export shopping carts', client => {
    test('should go to "Shopping cart" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.shopping_carts_submenu));
    test('should search the customer ', () => client.searchByValue(ShoppingCarts.customer_search_input, ShoppingCarts.search_button, 'abid'));
    test('should check the shopping cart informations', () => {
      return promise
        .then(() => client.getTextInVar(ShoppingCarts.id.replace('%NUMBER', 1), "id"))
        .then(() => client.getTextInVar(ShoppingCarts.order_id.replace('%NUMBER', 1), "order_id"))
        .then(() => client.getTextInVar(ShoppingCarts.customer.replace('%NUMBER', 1), "customer"))
        .then(() => client.getTextInVar(ShoppingCarts.total.replace('%NUMBER', 1), "total"))
        .then(() => client.getTextInVar(ShoppingCarts.carrier.replace('%NUMBER', 1), "carrier"))
        .then(() => client.getTextInVar(ShoppingCarts.date.replace('%NUMBER', 1), "date"))
        .then(() => client.getTextInVar(ShoppingCarts.customer_online.replace('%NUMBER', 1), "customer_online"))
        .then(() => {
          global.orders.push(global.tab["id"] + ';' + global.tab["order_id"] + ';' + global.tab["customer"] + ';' + global.tab["total"]);
          console.log(global.orders);
        });
    });
   // test('should export carts', () => client.downloadDocument(ShoppingCarts.export_carts_button));
  }, 'order');
}, 'order');
