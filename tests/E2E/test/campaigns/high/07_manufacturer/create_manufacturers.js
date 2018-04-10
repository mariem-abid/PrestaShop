const {AccessPageBO} = require('../../../selectors/BO/access_page');
const manufacturer = require('../../common_scenarios/manufacturer');
let manufacturerInformation = {
  name: 'Brand',
  short_desc: 'Short description',
  description: 'Description',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description',
};
let manufacturerAddress = {
  last_name: 'PrestaShop',
  first_name: 'PrestaShop',
  address: '12 rue d\'amesterdam',
  second_address: 'RDC',
  postal_code: '75009',
  city: 'Paris',
  home_phone: '0123456789',
  mobile_phone: '9876543210',
  other: 'Azerty',
};
scenario('Create "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');
  manufacturer.createManufacturer(manufacturerInformation);
  manufacturer.createManufactureAddress(manufacturerInformation, manufacturerAddress);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')
}, 'manufacturers', true);
