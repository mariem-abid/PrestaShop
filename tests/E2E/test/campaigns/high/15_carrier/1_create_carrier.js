const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CarrierSubMenu} = require('../../../selectors/BO/catalogpage/carrier_submenu');

let promise = Promise.resolve();

scenario('Create "Carrier"', () => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'carrier');



    scenario('Create a new "Carrier"', client => {
        test('should go to "Shipping" page', () => client.goToSubtabMenuPage(Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping. carriers_submenu));
        test('should click on "Add new carrier" button', () => client.waitForExistAndClick(CarrierSubMenu.new_carrier_button));
        test('should set the "Name" input', () => client.waitAndSetValue(CarrierSubMenu.name_input, 'Nafship' + date_time));
        test('should set the "Transit time" input', () => client.waitAndSetValue(CarrierSubMenu.transit_time, '5 heures' ));
        test('should set the "Speed grade" input', () => client.waitAndSetValue(CarrierSubMenu.speed_grade, 'way' ));
        test('should upload the logo', () => client.uploadPicture('carrier_image.png', CategorySubMenu.picture, 'image'));


    }, 'carrier');
}, 'carrier', true);