/**
 * This script is based on the scenario described in this test link
 * [id="PS-19"][Name="Installation of a module by zip folder"]
 **/

const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {ModulePage} = require('../../../selectors/BO/module_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const module_common_scenarios = require('../../common_scenarios/module');
const {Menu} = require('../../../selectors/BO/menu.js');
const welcomeScenarios = require('../../common_scenarios/welcome');
let promise = Promise.resolve();

scenario('Install "PrestaShop Security" module', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  welcomeScenarios.findAndCloseWelcomeModal();
  scenario('Check then uninstall "ps_mbo" module', client => {
    module_common_scenarios.installUninstallMboModule(client, ModulePage, AddProductPage, "ps_mbo", 'Uninstall');
  }, 'onboarding');
  module_common_scenarios.installAndCheckAbondonedCartProModule(ModulePage);
  scenario('Uninstall "abondoned cart pro" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, AddProductPage, 'cartabandonmentprol');
  }, 'common_client');
  module_common_scenarios.installAndCheckAbondonedCartProModule(ModulePage);
  scenario('Check then install "ps_mbo" module', client => {
    module_common_scenarios.installUninstallMboModule(client, ModulePage, AddProductPage, "ps_mbo", 'install');
  }, 'onboarding');

  //verify this steps with Marion
  scenario('Uninstall "abondoned cart pro" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, AddProductPage, 'cartabandonmentpro');
  }, 'common_client');

  module_common_scenarios.installAndCheckAbondonedCartProModule(ModulePage);
  scenario('Uninstall "abondoned cart pro" module', client => {
    module_common_scenarios.uninstallModule(client, ModulePage, AddProductPage, 'cartabandonmentpro');
  }, 'common_client');
  module_common_scenarios.installAndCheckAbondonedCartProModule(ModulePage);
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
