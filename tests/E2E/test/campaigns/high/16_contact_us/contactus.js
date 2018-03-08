const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ContactSubMenu} = require('../../../selectors/FO/contactus_submenu');
const {Customer} = require('../../../selectors/BO/customers/customer_service');
let promise = Promise.resolve();

scenario('Contact us', () => {

  scenario('Open the browser and connect to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should change lang eng', () => client.changeLanguage());
  }, 'contact');

  scenario('Contact the shop', client => {
    test('should click on "Contact us" link', () => client.waitForExistAndClick(ContactSubMenu.contact_link));
    test('should contact customer service', () => client.waitAndSelectByValue(ContactSubMenu.subject, 2));
    test('should pause', () => client.pause(1000));
    test('should set the "message " input', () => {
      return promise
        .then(() => client.waitForExistAndClick(ContactSubMenu.message))
        .then(() => client.waitAndSetValue(ContactSubMenu.message, 'Please help me '));
    });
    test('should click on "send" button', () => client.waitForExistAndClick(ContactSubMenu.send_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(ContactSubMenu.green_validation, 'Your message has been successfully sent to our team.'));
  }, 'contact');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'contact');
}, 'contact', true);

scenario('Checking the message in BO', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'contact');

  scenario('Checking the message', client => {
    test('should click on the notification icon', () => client.waitForExistAndClick(ContactSubMenu.notification_icon));
    test('should click on the tab message', () => client.waitForExistAndClick(ContactSubMenu.message_tab));
    test('should verify the name of the customer', () => client.checkTextValue(ContactSubMenu.customer_name, 'John DOE'));
    test('should click on the message-notification', () => client.waitForExistAndClick(ContactSubMenu.customer_message));
  }, 'contact');

  scenario('Check the customer existance and delete the message', client => {
    test('should click on the "Customer service" menu', () => client.waitForExistAndClick(Customer.customer_service_menu));
    test('should search the customer by email', () => client.searchByEmail(Customer.customer_filter_by_email_input, Customer.search_button, 'pub@prestashop.com'));
    test('should click on the icon', () => client.waitForExistAndClick(Customer.icon));
    test('should click on the "Delete" button', () => {
      return promise
        .then(() =>client.waitForExistAndClick(Customer.delete_button))
        .then(() =>client.alertAccept())
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(Customer.green_validation, '×\nSuccessful deletion.'));
  }, 'contact');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'contact');
}, 'contact',true);
  
