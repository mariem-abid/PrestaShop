/**
 * This script is based on the scenario described in this test link
 * [id="PS-70"][Name="Check notifications"]
 **/

const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const module_common_scenarios = require('../../common_scenarios/module');
let promise = Promise.resolve();

scenario('Check notification module in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Check then install "ps_mbo" module', client => {
    module_common_scenarios.installUninstallMboModule(client, ModulePage, AddProductPage, "ps_mbo", 'install');
  }, 'onboarding');
  scenario('Configure "Bank Transfer" module', client => {
    module_common_scenarios.configureBankTransferModule(client,ModulePage);
  }, 'common_client');
  scenario('Check that the module is well configured', client => {
   module_common_scenarios.checkConfigurationModule(client,ModulePage,'ps_wirepayment');
  }, 'common_client');
  scenario('Reset the configured module', client => {
    module_common_scenarios.resetModule(client, ModulePage, AddProductPage, 'Bank transfer', 'ps_wirepayment');
  }, 'common_client');
  scenario('Check then uninstall "ps_mbo" module', client => {
    module_common_scenarios.installUninstallMboModule(client, ModulePage, AddProductPage, "ps_mbo", 'Uninstall');
  }, 'onboarding');
  scenario('Configure "Bank Transfer" module', client => {
    module_common_scenarios.configureBankTransferModule(client,ModulePage);
  }, 'common_client');
  scenario('Check that the module is well configured', client => {
    module_common_scenarios.checkConfigurationModule(client,ModulePage,'ps_wirepayment');
  }, 'common_client');
  scenario('Reset the configured module', client => {
    module_common_scenarios.resetModule(client, ModulePage, AddProductPage, 'Bank transfer', 'ps_wirepayment');
  }, 'common_client');
  scenario('Check then install "ps_mbo" module', client => {
    module_common_scenarios.installUninstallMboModule(client, ModulePage, AddProductPage, "ps_mbo", 'install');
  }, 'onboarding');
  scenario('Upgrade "Faceted search" module', client => {
    module_common_scenarios.configureBankTransferModule(client,ModulePage);
  }, 'common_client');
  scenario('Check that the module is well configured', client => {
    module_common_scenarios.checkConfigurationModule(client,ModulePage,'ps_wirepayment');
  }, 'common_client');

  /*
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');*/
}, 'common_client', false);
