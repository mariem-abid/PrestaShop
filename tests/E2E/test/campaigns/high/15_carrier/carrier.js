const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CarrierSubMenu} = require('../../../selectors/BO/catalogpage/carrier_submenu');

let promise = Promise.resolve();

scenario('Create "CRUD Carrier"', () => {

  scenario('Create carrier', () => {

    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'carrier');

    scenario('Create a new "Carrier"', client => {
      test('should go to "Shipping" page', () => client.goToSubtabMenuPage(Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.carriers_submenu));
      test('should click on "Add new carrier" button', () => client.waitForExistAndClick(CarrierSubMenu.new_carrier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(CarrierSubMenu.name_input, 'carrier' + date_time));
      test('should set the "Transit time" input', () => client.waitAndSetValue(CarrierSubMenu.transit_time, '5 heures'));
      test('should upload the logo', () => client.uploadPicture('carrier_image.jpeg', CarrierSubMenu.logo, 'image'));
      test('should click on "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
      test('should enable the "Add handling costs" ', () => client.waitForExistAndClick(CarrierSubMenu.shipping_handling.replace('%id', 1), 1000));
      test('should click on "According to total price"', () => client.waitForExistAndClick(CarrierSubMenu.billing_price));
      test('should set the "price inf " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 1), 0));
      test('should set the "price sup " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 2), 10000));
      test('should check all zones', () => client.waitForExistAndClick(CarrierSubMenu.all_zone, 1000));
      test('should set the "price per zone " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 3), 12));
      test('should click on "Next" button', () =>client.scrollWaitForExistAndClick(CarrierSubMenu.next_button, 60));
      test('should set the "Maximum package width (cm) " input', () => client.waitAndSetValue(CarrierSubMenu.max_width, 100));
      test('should set the "Maximum package height (cm) " input', () => client.waitAndSetValue(CarrierSubMenu.max_hieght, 100));
      test('should set the "Maximum package depth (cm)" input', () => client.waitAndSetValue(CarrierSubMenu.max_depth, 100));
      test('should set the "Maximum package weight (kg)" input', () => client.waitAndSetValue(CarrierSubMenu.max_weight, 100));
      test('should click on "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
      test('should click on "finish" button', () => client.waitForExistAndClick(CarrierSubMenu.finish_button));
    }, 'carrier');
  }, 'carrier');

  scenario('Update carrier', client => {
    test('should search for carrier ', () => client.searchByValue(CarrierSubMenu.search_input, CarrierSubMenu.search_button, 'carrier' + date_time));
    test('should click on "Edit" action', () => client.waitForExistAndClick(CarrierSubMenu.update_button));
    test('should click on "Next" button', () => client.waitForExistAndClick(CarrierSubMenu.next_button));
    test('should click on "According to total weight"', () => client.waitForExistAndClick(CarrierSubMenu.billing_weight, 1000));
    test('should set the "weight inf " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 1), 0.1));
    test('should set the "weight sup " input', () => {
      return promise
        .then(() =>client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 2), 10))
        .then(() =>client.pause(1000))
    });
    test('should set the "price per zone " input', () => client.waitAndSetValue(CarrierSubMenu.range.replace('%id', 3), 8));
    test('should click on "finish" button', () =>client.scrollWaitForExistAndClick(CarrierSubMenu.finish_button, 60));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CarrierSubMenu.green_validation, '×\nSuccessful update.'));
  }, 'carrier');

  scenario('Delete carrier', client => {
    test('should click on the icon', () => client.waitForExistAndClick(CarrierSubMenu.icon, 1000));
    test('should click on "Delete" button', () => {
      return promise
        .then(() =>client.waitForExistAndClick(CarrierSubMenu.delete_button))
        .then(() =>client.alertAccept())
    });
  }, 'carrier')

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'carrier');
}, 'category', true);

