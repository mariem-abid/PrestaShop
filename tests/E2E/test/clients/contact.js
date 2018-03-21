var CommonClient = require('./common_client');
class contact extends CommonClient {

  searchByEmail(selector, searchButton, email) {
    return this.client
      .isVisible(selector)
      .waitAndSetValue(selector, email)
      .waitForExistAndClick(searchButton);
  }
}
module.exports = contact;
