const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenario = require('./new_product_fo');

scenario('Display the new products page', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'product/product')
  common_scenario.displayNewProfuctFO();
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'product/product');
}, 'product/product',true);