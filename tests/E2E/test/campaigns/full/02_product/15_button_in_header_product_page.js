const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');

scenario('Check if the buttons in the header of the product page ', client => {
  test('should open browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));
 // test('should check the product name is empty by default and the text "Enter the name of your product" appears', () => client.checkAttributeValue(AddProductPage.product_name_input,'placeholder','Enter your product name','equal'));
  test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, 'product'+ date_time));
  test('should close symfony Profiler', () => {
    return promise
      .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
      .then(() => {
        if (global.isVisible) {
          client.waitForExistAndClick(AddProductPage.symfony_toolbar);
        }
      })
  });
  test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
  test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));

  }, 'product/product');
