const {AccessPageBO} = require('../../../selectors/BO/access_page');
const common_scenarios = require('./carrier');
let carrierInformation = {
  name: 'Carrier',
  transitTime: '5 hours',
  image: 'carrier_image.jpeg',
  priceInf: '0',
  priceSup: '100000',
  price: '12',
  maxPackWidth: '100',
  maxPackheight: '100',
  maxPackdepth: '100',
  maxPackweight: '100',
  weightInf: '0.1',
  weightSup: '100',
  price2: '8'
};

scenario('Create, edit and delete carrier in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_scenarios.createCarrier(carrierInformation.name, carrierInformation.transitTime, carrierInformation.image, carrierInformation.priceInf, carrierInformation.priceSup, carrierInformation.price, carrierInformation.maxPackWidth, carrierInformation.maxPackheight, carrierInformation.maxPackdepth, carrierInformation.maxPackweight);
  common_scenarios.editCarrier(carrierInformation.name, carrierInformation.weightInf, carrierInformation.weightSup, carrierInformation.price2);
  common_scenarios.deleteCarrier();
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);