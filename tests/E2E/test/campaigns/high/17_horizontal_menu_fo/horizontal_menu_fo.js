const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenarios = require('../../common_scenarios/horizontal_menu');
//const {HorizontalMenu}=require('../../../selectors/FO/horizontal_menu');

scenario('Click on a link on the horizontal menu', () => {
  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'common_client');
  common_scenarios.menuHorizontal();
  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'common_client');
}, 'common_client',true);