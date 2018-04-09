const {Menu} = require('../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {CatalogPage} = require('../../selectors/BO/catalogpage/index');
const {Brands} = require('../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../selectors/BO/catalogpage/Manufacturers/brands_address');
const {BrandsFO} = require('../../selectors/FO/brands_FO');
let promise = Promise.resolve();
module.exports = {
  createManufacturer(name, short_desc, description, image, meta_title, meta_description) {
    scenario('Create a new "Manufacturer"',client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should click on "Add new brand" button', () => client.waitForExistAndClick(Brands.new_brand_button));
      test('should set the "Name" input',() => client.waitAndSetValue(Brands.name_input, name + date_time));
      test('should set the "short description" input',() => client.setTextToEditor(Brands.short_desc_textarea, short_desc));
      test('should set the "description" input',() => client.setTextToEditor(Brands.desc_textarea, description));
      test('should upload "Picture" to the brand', () => client.uploadPicture(image, Brands.image_input, "logo"));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Brands.meta_title_input, meta_title));
      test('should set the "Meta description" input', () => client.waitAndSetValue(Brands.meta_description_input, meta_description));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Brands.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Brands.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'manufacturers');
  },
  updateManufacturer(name, short_desc_updated, description_updated) {
    scenario('Update the created "Manufacturer"', client => {
      test('should search for brand', () => client.searchByValue(Brands.search_input, Brands.search_button, name + date_time));
      test('should click on "the icon"', () => client.waitForExistAndClick(Brands.icon));
      test('should click on "Edit" action', () => client.waitForExistAndClick(Brands.update_button));
      test('should set the "short description" input', () => {
        return promise
          .then(() => client.waitForExist(Brands.short_desc_textarea, 3000))
          .then(() => client.setTextToEditor(Brands.short_desc_textarea, short_desc_updated))
      });
      test('should set the "description" input', () => {
        return promise
          .then(() => client.waitForExist(Brands.desc_textarea, 3000))
          .then(() => client.setTextToEditor(Brands.desc_textarea, description_updated))
      });
      test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
    }, 'manufacturers');
  },
  checkManufacturerCreateInFO(name, short_desc, description) {
    scenario('Check that the manufacturer is well created in the Front Office', client => {
      test('should click on the "Sitemap"', () => client.scrollWaitForExistAndClick(BrandsFO.site_map, 3000));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should go to the "Brands" informations', () => client.scrollWaitForExistAndClick(BrandsFO.brands_info.replace('%s', name.toLowerCase() + date_time)));
      test('should verify the short description of the manufacturer', () => client.checkTextValue(BrandsFO.short_description, short_desc));
      test('should verify the description of the manufacturer', () => client.checkTextValue(BrandsFO.description, description));
    }, 'manufacturers');
  },
  checkManufacturerUpdateInFO(name, short_desc_updated, description_updated) {
    scenario('Check that the manufacturer is well modified in the Front Office', client => {
      test('should click on the "Sitemap"', () => client.scrollWaitForExistAndClick(BrandsFO.site_map, 3000));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should go to the "Brands" informations', () => client.scrollWaitForExistAndClick(BrandsFO.brands_info.replace('%s', name.toLowerCase() + date_time)));
      test('should verify the short description of the manufacturer', () => client.checkTextValue(BrandsFO.short_description, short_desc_updated));
      test('should verify the description of the manufacturer', () => client.checkTextValue(BrandsFO.description, description_updated));
    }, 'manufacturers');
  },
  checkManufacturerDeleteInFO() {
    scenario('Check that the manufacturer is well deleted in the Front Office', client => {
      test('should click on the "Sitemap"', () => client.scrollWaitForExistAndClick(BrandsFO.site_map, 3000));
      test('should go to the "Brands" page', () => client.waitForExistAndClick(BrandsFO.brands_page));
    }, 'manufacturers');
  },
  checkProductWithManufacturerInFO(name) {
    scenario('Check that the manufacturer has a product', client => {
      test('should click on the "Sitemap"',() => client.waitForExistAndClick(BrandsFO.site_map));
      test('should go to the "Brands" page',() => client.waitForExistAndClick(BrandsFO.brands_page));
      test('should verify that the manufacturer has product',() => client.scrollWaitForExistAndClick(BrandsFO.brands_info.replace('%s', name.toLowerCase() + date_time)));
    }, 'manufacturers');
  },
  deleteManufacturer(name, first_name) {
    scenario('Delete the created "Manufacturer"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should search for brand', () => client.searchByValue(Brands.search_input, Brands.search_button, name + date_time));
      test('should click on "the icon"', () => client.waitForExistAndClick(Brands.icon));
      test('should click on "Delete" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(Brands.delete_button))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
     test('should search for brand addresse', () => client.searchByValue(BrandAddress.search_input_brand, BrandAddress.search_button, first_name));
    test('should check that the manufacturer is deleted', () => client.checkTextValue(BrandAddress.brand, '--'));
     test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
    }, 'manufacturers');
  },
  createManufactureAddress(name, last_name, first_name, address, second_address, postal_code, city, home_phone, mobile_phone, other) {
    scenario('Create a new "Manufacturer address"', client => {
      test('should click on "Add new brand address" button', () => client.waitForExistAndClick(BrandAddress.new_brand_address_button));
      test('should Choose the brand name', () => client.waitAndSelectByVisibleText(BrandAddress.branch_select, name + date_time));
      test('should set the "Last name" input', () => client.waitAndSetValue(BrandAddress.last_name_input, last_name));
      test('should set the "First name" input', () => client.waitAndSetValue(BrandAddress.first_name_input, first_name));
      test('should set the "Address" input', () => client.waitAndSetValue(BrandAddress.address_input, address));
      test('should set the "Second address" input', () => client.waitAndSetValue(BrandAddress.secondary_address, second_address));
      test('should set the "Zip code" input', () => client.waitAndSetValue(BrandAddress.postal_code_input, postal_code));
      test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, city));
      test('should choose the country', () => client.waitAndSelectByValue(BrandAddress.country, "8"));
      test('should set the "Home phone" input', () => client.waitAndSetValue(BrandAddress.home_phone_input, home_phone));
      test('should set the "Mobile phone" input', () => client.waitAndSetValue(BrandAddress.mobile_phone_input, mobile_phone));
      test('should set the "Other information" input', () => client.waitAndSetValue(BrandAddress.other_input, other));
      test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
      test('should search for a brand', () => client.searchByValue(Brands.search_input_brand, Brands.search_button,name + date_time));
      test('should check the address number of a brand', () => client.checkTextValue(Brands.number_addresses, '1'));

    }, 'manufacturers');
  },
  updateManufactureAddress(first_name, address_updated, city_updated) {
    scenario('Update the created "Manufacturer address"', client => {
      test('should search for a brand address ', () => client.searchByValue(BrandAddress.search_input_brand, BrandAddress.search_button, first_name));
      test('should click on "Edit" action', () => client.waitForExistAndClick(BrandAddress.update_button));
      test('should set the "Address" input', () => client.waitAndSetValue(BrandAddress.address_input, address_updated));
      test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, city_updated));
      test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
      test('should search for a brand city updated', () => client.searchByValue(BrandAddress.search_input_city, BrandAddress.search_button, city_updated));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
    }, 'manufacturers');
  },
  deleteManufacturerAddress(name, first_name) {
    scenario('Delete the created "Manufacturer address"', client => {
      test('should search for brand address ', () => client.searchByValue(BrandAddress.search_input_brand, BrandAddress.search_button, first_name));
      test('should click on "the icon"', () => client.waitForExistAndClick(BrandAddress.icon));
      test('should click on "Delete" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(BrandAddress.delete_button))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_button));
      test('should search for brand', () => client.searchByValue(Brands.search_input, Brands.search_button, name + date_time));
      test('should check that the manufacturer is deleted', () => client.checkTextValue(Brands.number_addresses, '--'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_button));
    }, 'manufacturers');

  }
};
