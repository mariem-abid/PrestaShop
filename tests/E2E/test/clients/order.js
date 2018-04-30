var CommonClient = require('./common_client');
const {OrderPage} = require('../selectors/BO/order');
const {CreateOrder} = require('../selectors/BO/order');
let common = require('../common.webdriverio');
let fs = require('fs');
global.tab = [];
global.orders = [];
global.ligneFile = [];

class Order extends CommonClient {

  addOrderMessage(orderMessage) {
    return this.client
      .scroll(0.900)
      .waitForExist(CreateOrder.order_message_textarea, 90000)
      .pause(2000)
      .setValue(CreateOrder.order_message_textarea, orderMessage)
  }

  updateStatus(value) {
    return this.client
      .execute(function () {
        document.querySelector('#id_order_state').style = "";
      })
      .selectByVisibleText(OrderPage.order_state_select, value)
      .then(() => this.client.getValue(OrderPage.order_state_select))
      .then((order) => global.order_status = order)
  }

  downloadDocument(selector) {
    return this.client
      .waitForExistAndClick(selector)
      .then(() => this.client.getText(selector))
      .then((name) => global.invoiceFileName = name.replace('#', ''))
      .then(() => this.client.pause(2000));
  }

  downloadCart(selector) {
    return this.client
      .waitForExistAndClick(selector)
      .pause(2000)
      .then(() => {
        let exportDate = common.getCustomDate(0);
        let files = fs.readdirSync(downloadsFolderPath);
        for (let i = 0; i < files.length; i++) {
          if (files[i].includes('cart_' + exportDate)) {
            global.exportCartFileName = files[i];
          }
        }
      });
  }

  getShoppingCartNumber(selector) {
    return this.client
      .execute(function (selector) {
        let count = document.getElementById(selector).getElementsByTagName("tbody")[0].children.length;
        return count;
      }, selector)
      .then((count) => {
        global.shoppingCartsNumber = count.value;
        console.log(global.shoppingCartsNumber);
      });
  }


  readFile(folderPath, fileName, pause = 0) {
    fs.readFile(folderPath + fileName, {encoding: 'utf-8'}, function (err, data) {
      if (!err) {
        global.ligneFile = data.split("\n");
        console.log((global.ligneFile));
      } else {
        console.log(err);
      }
    });
    return this.client
  }


  checkFile(folderPath, fileName, pause = 0) {
    fs.stat(folderPath + fileName, function (err, stats) {
      err === null && stats.isFile() ? global.existingFile = true : global.existingFile = false;
      console.log(err);
      console.log(stats);
    });
    return this.client
      .pause(pause)
      .then(() => expect(global.existingFile).to.be.true)
  }


  compareFileAndShoppingCarts(pause = 0) {
    return this.client
      .pause(pause)
      .then(() => {
        for (let i = 1; i < (global.ligneFile.length - 1); i++) {
          if (global.ligneFile[i] === (global.orders[i - 1])) {
            console.log("ok");
          } else {
            console.log("not ok");
          }
        }
      })
  }

  checkEnable(selector) {
    return this.client
      .waitForExist(selector, 90000)
      .isEnabled(selector)
      .then((text) => expect(text).to.be.false);
  }
}

module.exports = Order;
