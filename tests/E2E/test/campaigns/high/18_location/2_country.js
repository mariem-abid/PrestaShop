const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Location} = require('../../../selectors/BO/location');

scenario('Add, edit and  activate country restrictions in the Back Office', () => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Create a new "Country"', client => {
    test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
    test(' should go to the page "Countries"', () => client.waitForExistAndClick(Menu.Improve.International.countries_tab));
    test('should click the "Add new country" button', () => client.waitForExistAndClick(Location.Country.new_country_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Location.Country.name_input, 'Country' + date_time));
    test('should set the "ISO code" input', () => client.waitAndSetValue(Location.Country.iso_code, 'XW'));
    test('should set the "Call prefix" input', () => client.waitAndSetValue(Location.Country.call_prefix, '0'));
    test('should select the "Zone"', () => client.waitAndSelectByValue(Location.Country.zone, '5'));
    test('should enable "postal code"', () => client.waitForExistAndClick(Location.Country.zip_code_on));
    test('should indicate the format of the postal code', () => client.waitAndSetValue(Location.Country.code_format, 'CNNNNN'));
    test('should enable "Contains states"', () => client.waitForExistAndClick(Location.Country.contains_states_on));
    test('should click the "Save" button', () => client.waitForExistAndClick(Location.Country.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Location.green_validation_notice, '×\nSuccessful creation.'));
  }, 'common_client');

  scenario('Edit a "Country"', client => {
    test('should search for Country ', () => client.searchByValue(Location.Country.searchCountryByName, Location.Country.search_button, 'Country' + date_time));
    test('should click the "Edit" button', () => client.waitForExistAndClick(Location.Country.update_button));
    test('should rename country', () => client.waitAndSetValue(Location.Country.name_input, 'New Country' + date_time));
    test('should change the "Zone"', () => client.waitAndSelectByValue(Location.Country.zone, '6'));
    test('should click the "Save" button', () => client.waitForExistAndClick(Location.Country.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Location.green_validation_notice, '×\nSuccessful update.'));
    test('should click the "Reset" button', () => client.waitForExistAndClick(Location.Country.reset_button));
  }, 'common_client');

  scenario('Activate country restrictions', client => {
    test('should enable country restrictions', () =>client.scrollWaitForExistAndClick(Location.Country.restrict_country_on, 60));
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');

}, 'common_client', true);
