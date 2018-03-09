const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {productPage} = require('../../../selectors/FO/product_page');

scenario('New product', () => {

  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'product/product');

  scenario('Display the new products page', client => {
    test('should click on "New products"', () => client.scrollWaitForExistAndClick(productPage.new_product_page, 60));
    test('should display a product', () => client.waitForExistAndClick(productPage.first_new_product));
    test('should check if the product contains the "New" label', () => client.checkTextValue(productPage.new_label, 'NEW'));
  }, 'product/product');
  
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'product/product');

}, 'product/product',true);
  
