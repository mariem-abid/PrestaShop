const {AccessPageFO} = require('../../selectors/FO/access_page');

scenario('Open the browser and access to the FO', client => {
     test('should open the browser', () => client.open());
     test('should access to FO', () => client.accessToFO(AccessPageFO));
     test('should change the FO language to english', () => client.changeLanguage());
   }, 'common_client');
