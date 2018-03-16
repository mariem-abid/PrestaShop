const {productPage} = require('../../../selectors/FO/product_page');

module.exports = {
  displayNewProfuctFO(){
    scenario('Display the new products page', client => {
      test('should click on "New products"', () => client.scrollWaitForExistAndClick(productPage.new_product_page, 60));
      test('should check if the product contains the "New" label', () => client.checkTextValue(productPage.new_label, 'NEW'));
    }, 'product/product');
  },
};