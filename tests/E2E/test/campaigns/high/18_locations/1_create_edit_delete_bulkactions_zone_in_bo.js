const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./zone');
let zoneInformation = {
  name: 'Zone',
  updatename: 'New zone'
};

scenario('Add, edit,delete and bulk actions zone in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createZone(zoneInformation.name);
  common_scenarios.editZone(zoneInformation.name, zoneInformation.updatename);
  common_scenarios.deleteZone();

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
