const {Menu} = require('../../../selectors/BO/menu.js');
const {CarrierSubMenu} = require('../../../selectors/BO/catalogpage/carrier_submenu');
let promise = Promise.resolve();

module.exports = {
  createCarrier(name, transitTime, image, priceInf, priceSup, price, maxPackWidth, maxPackheight, maxPackdepth, maxPackweight){
    scenario('Create a new "Carrier"', client => {
      test('should go to "Shipping" page', () => client.goToSubtabMenuPage(Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.carriers_submenu));
      test('should click on "Add new carrier" button', () => client.waitForExistAndClick(CarrierSubMenu.new_carrier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(CarrierSubMenu.name_input, name + date_time));
      test('should set the "Transit time" input', () => client.waitAndSetValue(CarrierSubMenu.transit_time, transitTime));
      test('should upload the logo', () => client.uploadPicture(image, CarrierSubMenu.logo, 'image'));
      test('should click on the "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
      test('should enable the "Add handling costs" ', () => client.waitForExistAndClick(CarrierSubMenu.shipping_handling.replace('%id', 1), 1000));
      test('should choose the "According to total price"', () => client.waitForExistAndClick(CarrierSubMenu.billing_price));
      test('should set the "price inf " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 1), priceInf));
      test('should set the "price sup " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 2), priceSup));
      test('should check all zones', () => client.waitForExistAndClick(CarrierSubMenu.all_zone, 1000));
      test('should set the "price per zone " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 3), price));
      test('should click on the "Next" button', () =>client.scrollWaitForExistAndClick(CarrierSubMenu.next_button, 60));
      test('should set the "Maximum package width (cm) " input', () => client.waitAndSetValue(CarrierSubMenu.max_width, maxPackWidth));
      test('should set the "Maximum package height (cm) " input', () => client.waitAndSetValue(CarrierSubMenu.max_hieght, maxPackheight));
      test('should set the "Maximum package depth (cm)" input', () => client.waitAndSetValue(CarrierSubMenu.max_depth, maxPackdepth));
      test('should set the "Maximum package weight (kg)" input', () => client.waitAndSetValue(CarrierSubMenu.max_weight, maxPackweight));
      test('should click on "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
      test('should click on "finish" button', () => client.waitForExistAndClick(CarrierSubMenu.finish_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CarrierSubMenu.green_validation, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  editCarrier(name, weightInf, weightSup, price2){
    scenario('Update carrier', client => {
      test('should search for carrier ', () => client.searchByValue(CarrierSubMenu.search_input, CarrierSubMenu.search_button, name + date_time));
      test('should click on "Edit" action', () => client.waitForExistAndClick(CarrierSubMenu.update_button));
      test('should click on "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
      test('should choose the "According to total weight"', () => client.waitForExistAndClick(CarrierSubMenu.billing_weight, 1000));
      test('should set the "weight inf " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 1), weightInf));
      test('should set the "weight sup " input', () => {
        return promise
          .then(() =>client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 2), weightSup))
          .then(() =>client.pause(1000))
      });
      test('should set the "price per zone" input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 3), price2));
      test('should click on the "finish" button', () =>client.scrollWaitForExistAndClick(CarrierSubMenu.finish_button, 60));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CarrierSubMenu.green_validation, '×\nSuccessful update.'));
    }, 'common_client');
  },
  deleteCarrier(){
    scenario('Delete carrier', client => {
      test('should click on the icon', () => client.waitForExistAndClick(CarrierSubMenu.icon, 1000));
      test('should click on the "Delete" button', () => {
        return promise
          .then(() =>client.waitForExistAndClick(CarrierSubMenu.delete_button))
          .then(() =>client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(CarrierSubMenu.green_validation, '×\nSuccessful deletion.'));
      test('should click on the "Reset" button', () => client.waitForExistAndClick(CarrierSubMenu.reset_button))
    }, 'common_client');
  },
};