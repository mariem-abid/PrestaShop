const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Location} = require('../../../selectors/BO/location');
let promise = Promise.resolve();

scenario('Add, edit and  activate country restrictions in the Back Office', () => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Create a new "Zone"', client => {
    test('should go to "Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
    test('should click the "Add new zone" button', () => client.waitForExistAndClick(Location.Zone.new_zone_button));
    test('should set the "Name" input', () => client.waitAndSetValue(Location.Zone.name_input, 'Zone' + date_time));
    test('should active the zone', () => client.waitForExistAndClick(Location.Zone.zone_active.replace('%id', 1)));
    test('should click the "Save" button', () => client.waitForExistAndClick(Location.Zone.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Location.green_validation_notice, '×\nSuccessful creation.'));
  }, 'common_client');

  scenario('Edit a zone', client => {
    test('should search for zone ', () => client.searchByValue(Location.Zone.searchZoneByName, Location.Zone.search_button, 'Zone' + date_time));
    test('should click the "Edit" button', () => client.waitForExistAndClick(Location.Zone.update_button));
    test('should rename zone', () => client.waitAndSetValue(Location.Zone.name_input, 'New zone' + date_time));
    test('should click the "Save" button', () => client.waitForExistAndClick(Location.Zone.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(Location.green_validation_notice, '×\nSuccessful update.'));
  }, 'common_client');

  scenario('Delete a zone', client => {
    test('should click  the icon', () => client.waitForExistAndClick(Location.Zone.icon, 1000));
    test('should click  the "Delete" button', () => {
      return promise
        .then(() =>client.waitForExistAndClick(Location.Zone.delete_button))
        .then(() =>client.alertAccept())
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(Location.green_validation_notice, '×\nSuccessful deletion.'));
    test('should click the "Reset" button', () => client.waitForExistAndClick(Location.Zone.reset_button));
  }, 'common_client');

  scenario('Bulk actions', client => {
    test('should click the "Bulk actions" button', () => client.waitForExistAndClick(Location.Zone.bulk_action));
    test('should select all zones', () => client.waitForExistAndClick(Location.Zone.bulk_action_menu.replace('%id', 1)));
    test('should click the "Bulk actions" button', () => client.waitForExistAndClick(Location.Zone.bulk_action));
    test('should disable all zones', () => client.waitForExistAndClick(Location.Zone.bulk_action_menu.replace('%id', 5)));
    test('should click the "Bulk actions" button', () => client.waitForExistAndClick(Location.Zone.bulk_action));
    test('should enable all zones', () => client.waitForExistAndClick(Location.Zone.bulk_action_menu.replace('%id', 4)));
  }, 'common_client');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');

}, 'common_client', true);
