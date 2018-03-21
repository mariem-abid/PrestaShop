const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('../../common_scenarios/contact_us');
let contactInformation = {
  name: 'John DOE',
  email: 'pub@prestashop.com',
  message: 'Please help me',
};
scenario('Contact us', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'contact');
  common_scenarios.contactShop(contactInformation.message);
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'contact');
}, 'contact', true);

scenario('Checking the message in BO', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'contact');
  common_scenarios.checkMessageInBO(contactInformation.name);
  common_scenarios.checkCustomer(contactInformation.name, contactInformation.email);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'contact');
}, 'contact', true);
