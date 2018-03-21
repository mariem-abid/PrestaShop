const {ContactSubMenu} = require('../../selectors/FO/contactus_submenu');
const {Customer} = require('../../selectors/BO/customers/customer_service');
let promise = Promise.resolve();
module.exports = {
  contactShop(message){
    scenario('Contact the shop', client => {
      test('should click on "Contact us" link', () => client.waitForExistAndClick(ContactSubMenu.contact_link));
      test('should contact customer service', () => client.waitAndSelectByValue(ContactSubMenu.subject, 2));
      test('should pause', () => client.pause(1000));
      test('should set the "message " input', () => {
        return promise
          .then(() => client.waitForExistAndClick(ContactSubMenu.message))
          .then(() => client.waitAndSetValue(ContactSubMenu.message, message));
      });
      test('should click on "send" button', () => client.waitForExistAndClick(ContactSubMenu.send_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ContactSubMenu.green_validation, 'Your message has been successfully sent to our team.'));
    }, 'contact');
  },
  checkMessageInBO(name){
    scenario('Checking the message', client => {
      test('should click on the notification icon', () => client.waitForExistAndClick(ContactSubMenu.notification_icon));
      test('should click on the tab message', () => client.waitForVisibleAndClick(ContactSubMenu.message_tab));
      test('should verify the name of the customer', () => client.checkTextValue(ContactSubMenu.customer_name, name));
      test('should click on the message-notification', () => client.waitForExistAndClick(ContactSubMenu.customer_message));
    }, 'contact');
  },
  checkCustomer(name, email){
    scenario('Check the customer existance and delete the message', client => {
      test('should click on the "Customer service" menu', () => client.waitForExistAndClick(Customer.customer_service_menu));
      test('should verify the name of the customer', () => client.checkTextValue(ContactSubMenu.customer_check.replace('%id', 2), name));
      test('should verify the email of the customer', () => client.checkTextValue(ContactSubMenu.customer_check.replace('%id', 3), email));
      test('should click on the icon', () => client.waitForExistAndClick(Customer.icon));
      test('should click on the "Delete" button', () => {
        return promise
          .then(() =>client.waitForExistAndClick(Customer.delete_button))
          .then(() =>client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(Customer.green_validation, '×\nSuccessful deletion.'));
    }, 'contact');
  },
};