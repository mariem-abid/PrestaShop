const {AccessPageBO} = require('../../../selectors/BO/access_page');
const manufacturer = require('../../common_scenarios/manufacturer');
let manufacturerInformation = {
  name: 'Brand',
  short_desc: 'Short description',
  description: 'Description',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description',
  short_desc_updated: 'Short description updated',
  description_updated: 'Description updated',
};
let manufacturerAddress = {
  last_name: 'PrestaShop',
  first_name: 'PrestaShop',
  address: '12 rue d\'amesterdam',
  address_updated: '1250 rue d\'amesterdam',
  second_address: 'RDC',
  postal_code: '75009',
  city: 'Paris',
  city_updated: 'Parissss',
  home_phone: '0123456789',
  mobile_phone: '9876543210',
  other: 'Azerty',
};
scenario('Create "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');
  manufacturer.createManufacturer(manufacturerInformation.name, manufacturerInformation.short_desc, manufacturerInformation.description, manufacturerInformation.image, manufacturerInformation.meta_title, manufacturerInformation.meta_description)
  manufacturer.createManufactureAddress(manufacturerInformation.name, manufacturerAddress.last_name, manufacturerAddress.first_name, manufacturerAddress.address, manufacturerAddress.second_address, manufacturerAddress.postal_code, manufacturerAddress.city, manufacturerAddress.home_phone, manufacturerAddress.mobile_phone, manufacturerAddress.other)
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')
}, 'manufacturers', true);
