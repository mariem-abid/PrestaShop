const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {HorizontalMenu}=require('../../../selectors/FO/horizontal_menu');
scenario('Click on a link on the horizontal menu', () => {

  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'common_client');

  scenario('choose category which should be displayed on your page', client => {
    test('should choose the category', () => client.goToSubtabMenuPage(HorizontalMenu.category_menu.replace('%id', 3), HorizontalMenu.category_menu.replace('%id', 5)));
    test('should cheeck the category name', () => client.checkTextValue(HorizontalMenu.category, 'WOMEN'))

  }, 'common_client');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'common_client');

}, 'common_client', true);
