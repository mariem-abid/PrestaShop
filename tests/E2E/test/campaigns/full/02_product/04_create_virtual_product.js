const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const commonScenarios = require('../../common_scenarios/product');
const {productPage} = require('../../../selectors/FO/product_page');
const {CategorySubMenu} = require('../../../selectors/BO/catalogpage/category_submenu');

let data = require('./../../../datas/product-data');

scenario('Create virtual Product in the Back Office', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Categories" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.category_submenu));
  test('should search for category', () => client.searchByValue(CategorySubMenu.search_input, CategorySubMenu.search_button, 'Clothes'));
  test('should get "ID" of the Clothes category', () => client.getTextInVar(CategorySubMenu.category_id.replace("%ID", 1), 'categeoryID'));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));
  scenario('Fill "Basic settings" form', client => {
    test('should select the "virtual product" type', () => client.waitAndSelectByValue(AddProductPage.product_type, 2));
    test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, data.virtual.name + date_time));
    test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, data.common.product_reference));
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
    commonScenarios.function41To49(client, 'virtualProduct', AddProductPage, productPage);
  }, 'product/product');
}, 'product/product');
