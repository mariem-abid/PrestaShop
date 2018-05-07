const manufacturer = require('../../common_scenarios/manufacturer');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const product = require('../../common_scenarios/product');
let manufacturerInformation = {
  name: 'Brand',
  short_desc: 'Short description',
  description: 'Description',
  image: 'prestashop.png',
  meta_title: 'meta title',
  meta_description: 'meta description',
};
let productData = {
  name: 'P1',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'test_1',
  brand: 'Brand',
};
let manufacturerAddress = {
  last_name: 'PrestaShop',
  first_name: 'PrestaShop',
  address: 'Amsterdam street',
  second_address: 'RDC',
  postal_code: '75009',
  city: 'Paris',
  home_phone: '0123456789',
  mobile_phone: '9876543210',
  other: 'Azerty',
};
scenario('Create a new manufacturer in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  manufacturer.createManufacturer(manufacturerInformation);
 /*scenario('Go to the Front Office', client => {
    test('should go to the Front Office', () => client.waitForExistAndClick(AccessPageBO.shopname, 2000));
    test('should switch to the Front Office window', () => client.switchWindow(1));
    test('should change the Front Office language to "English"', () => client.changeLanguage());
  }, 'common_client');
 manufacturer.checkManufacturerInFO(manufacturerInformation);
  scenario('Go back to the back Office', client => {
    test('should go back to the Back office page', () => client.switchWindow(0));
  }, 'common_client');
  product.createProduct(AddProductPage, productData);
  scenario('Go back to the Front Office', client => {
    test('should switch to the Front office page', () => client.switchWindow(1));
  }, 'common_client');
  manufacturer.checkProductWithManufacturerInFO(manufacturerInformation,productData);
  scenario('Go back to the Back Office', client => {
    test('should switch to the Back office page', () => client.switchWindow(0));
  }, 'common_client');*/
  manufacturer.updateManufacturer(manufacturerInformation);
  /*scenario('Go to the Front Office', client => {
    test('should go to the Front Office', () => client.waitForExistAndClick(AccessPageBO.shopname, 2000));
    test('should switch to the Front Office window', () => client.switchWindow(2));
    test('should change the Front Office language to "English"', () => client.changeLanguage());
  }, 'common_client');
  manufacturer.checkManufacturerInFO(manufacturerInformation);
  scenario('Go to the Back Office', client => {
    test('should switch to the Back office page', () => client.switchWindow(0));
  }, 'common_client');
  manufacturer.createManufactureAddress(manufacturerInformation, manufacturerAddress)
  manufacturer.updateManufactureAddress(manufacturerAddress);
  manufacturer.deleteManufacturer(manufacturerInformation, manufacturerAddress);
  scenario('Go to the Front Office', client => {
    test('should go to the Front Office', () => client.waitForExistAndClick(AccessPageBO.shopname, 2000));
    test('should switch to the Front Office window', () => client.switchWindow(1));
  }, 'common_client');
  manufacturer.checkManufacturerDeleteInFO();
  scenario('Go to the Back Office', client => {
    test('should switch to the Back Office window', () => client.switchWindow(0));
  }, 'common_client');
  manufacturer.createManufacturer(manufacturerInformation)
  manufacturer.deleteManufacturerAddress(manufacturerInformation, manufacturerAddress);
  /*scenario('Delete the "Graphic Corner" manufacturer', client => {
    test('should search for brand', () => client.searchByValue(Brands.search_input, Brands.search_button, 'Graphic Corner'));
    test('should click on "the icon"', () => client.waitForExistAndClick(Brands.icon));
    test('should click on "Delete" action', () => client.waitForExistAndClick(Brands.delete_button));
    test('should accept the alert', () => client.alertAccept());
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
  }, 'manufacturers');*/
}, 'manufacturers');

