const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CheckoutOrderPage, CustomerAccount} = require('../../../selectors/FO/order_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {OrderPage} = require('../../../selectors/BO/order');
const {accountPage} = require('../../../selectors/FO/add_account_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const commonScenarios = require('../../common_scenarios/product');

let data = require('./../../../datas/product-data');

scenario('Create standard Product in the Back Office', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));
  test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, data.standard.name + date_time));
  test('should upload the first product picture', () => client.uploadPicture('image_test.jpg', AddProductPage.picture));
  test('should set the "Tax exclude" price', () => client.setPrice(AddProductPage.priceTE_shortcut, data.common.priceTE));
  test('should check then close symfony toolbar', () => client.waitForSymfonyToolbar(AddProductPage, 1000));
  test('should switch the product online and verify the appearance of the green validation', async () => {
    await client.waitForExistAndClick(AddProductPage.product_online_toggle, 3000);
    await client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.', 3000);
  });
  test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 5000));
  test('should check and close the green validation', async () => {
    await client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.', 'equal', 2000);
    await client.waitForExistAndClick(AddProductPage.close_validation_button, 1000);
  });
  commonScenarios.function50To59(client, 'standard', AddProductPage, productPage, CheckoutOrderPage, accountPage, OrderPage, SearchProductPage, data);
}, 'product/product', true);
