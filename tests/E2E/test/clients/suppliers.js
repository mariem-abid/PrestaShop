let CommonClient = require('./common_client');
const {Supplier} = require('../selectors/BO/catalogpage/Suppliers/suppliers');

class Suppliers extends CommonClient {
  addMetaKeywords(selector) {
    return this.client
      .waitForVisible(selector, 90000)
      .setValue(selector, "key words")
      .keys('\uE007')
  }

  searchByName(selectorName) {
    if (isVisible) {
      return this.client
        .waitAndSetValue(Supplier.search_name_input, selectorName)
        .waitForExistAndClick(Supplier.search_button)
    }
  }

  checkButton(selectorReset) {
    if (isVisible) {
      return this.client
        .waitForExistAndClick(Supplier.reset_button)
    }
  }

}

module.exports = Suppliers;
