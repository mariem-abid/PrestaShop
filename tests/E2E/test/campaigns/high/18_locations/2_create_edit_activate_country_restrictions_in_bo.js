const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./country');
let countryInformation = {
  name: 'Country',
  isoCode: 'XW',
  callPrefix: '0',
  codeFormat: 'CNNNN',
  updatename: 'New country'
};

scenario('Add, edit and  activate country restrictions in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createCountry(countryInformation.name, countryInformation.isoCode, countryInformation.callPrefix, countryInformation.codeFormat);
  common_scenarios.editCountry(countryInformation.name, countryInformation.updatename);
  common_scenarios.activateCountryRestrictions();
  
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);


