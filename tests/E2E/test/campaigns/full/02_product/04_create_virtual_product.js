const {AddProductPage, ProductList} = require('../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {HomePage} = require('../../../selectors/FO/home_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {OrderPage} = require('../../../selectors/BO/order');
const {productPage} = require('../../../selectors/FO/product_page');
const commonScenarios = require('../../common_scenarios/product');
const commonOrder = require('../../common_scenarios/order');
const {CheckoutOrderPage, CustomerAccount} = require('../../../selectors/FO/order_page');
const {accountPage} = require('../../../selectors/FO/add_account_page');

const {Menu} = require('../../../selectors/BO/menu.js');
let data = require('./../../../datas/product-data');
let common = require('../../../common.webdriverio');
let promise = Promise.resolve();

scenario('Create virtual Product in the Back Office', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Edit the Basic settings', client => {
    test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, data.virtual.name + date_time));
    test('should set the "Summary" text', () => client.setEditorText(AddProductPage.summary_textarea, data.common.summary));
    test('should click on "Description" tab', () => client.waitForExistAndClick(AddProductPage.tab_description));
    test('should set the "Description" text', () => client.setEditorText(AddProductPage.description_textarea, data.common.description));
    test('should select the "virtual product"', () => client.waitAndSelectByValue(AddProductPage.product_type, 2));
    test('should set the "Quantity" of product', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, "10"));
    test('should select the "Tax rule" "10%"', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.pricing_tax_rule_arrow_button))
        .then(() => client.waitForVisibleAndClick(AddProductPage.tax_rule_value.replace('%ID', 'FR Taux réduit (10%)')))
    });
    test('should upload the first product picture', () => client.uploadPicture('image_test.jpg', AddProductPage.picture));
    test('should set the "Tax exclude" price', () => client.setPrice(AddProductPage.priceTE_shortcut, data.common.priceTE));
    test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, data.common.product_reference));
    test('should switch the product online', () => {
      return promise
        .then(() => client.waitForSymfonyToolbar(AddProductPage, 2000))
        .then(() => client.waitForExistAndClick(AddProductPage.product_online_toggle, 3000));
    });

  }, 'product/product');
  test('should select the "virtual product"', () => client.waitAndSelectByValue(AddProductPage.product_type, 2));
  test('should check that the "Quantity" tab is not visible', () => client.checkIsNotVisible(AddProductPage.product_quantity_tab, 1000));
  test('should check that the "Combination" Block is not visible', () => client.checkIsNotVisible(AddProductPage.product_combination_block, 1000));
  test('should check that the "Virtual product" tab is existing', () => client.isExisting(AddProductPage.product_virtual_tab, 1000));

  scenario('Edit Virtual product tab', client => {
    test('should go to the "Virtual product" tab ', () => client.scrollWaitForExistAndClick(AddProductPage.product_quantities_tab, 50));
    test('should set the "Quantity"', () => client.waitAndSetValue(AddProductPage.product_quantity_input, data.common.quantity));
    test('should set the "Minimum quantity for sale"', () => client.waitAndSetValue(AddProductPage.minimum_quantity_sale, data.common.qty_min));
    test('should indicate that the product do not have an associated file', () => client.associatedFile('1'));
    test('should indicate that the product have an associated file', () => client.associatedFile('0'));
    test('should add a file', () => client.addFile(AddProductPage.options_add_virtual_product_file_button, 'image_test.jpg'), 50);
    test('should check file "NAME"', () => client.checkAttributeValue(AddProductPage.virtual_file_name, 'value', 'image_test.jpg', 'equal', 3000));
    test('should edit file "NAME"', () => client.waitAndSetValue(AddProductPage.virtual_file_name, data.virtual.attached_file_name));
    test('should add file "NUMBER"', () => client.waitAndSetValue(AddProductPage.virtual_file_number_download, data.virtual.allowed_number_to_download));
    test('should add file "EXPIRATION DATE"', () => client.waitAndSetValue(AddProductPage.virtual_expiration_file_date, data.virtual.expiration_date));
    test('should add file "DAYS NUMBER"', () => client.waitAndSetValue(AddProductPage.virtual_number_days, data.virtual.number_of_days));
    test('should save attached file', () => client.scrollWaitForExistAndClick(AddProductPage.virtual_save_attached_file));
    test('should check "Delete this file" button', () => client.isExisting(AddProductPage.virtual_delete_attached_file));
    test('should check "Download file" button', () => client.isExisting(AddProductPage.virtual_download_attached_file));
    test('should click on "Download file" button', () => client.waitForExistAndClick(AddProductPage.virtual_download_attached_file, 8000));
    test('should click on "Deny orders"', () => client.scrollWaitForExistAndClick(AddProductPage.pack_availability_preferences, 50));
    test('should set the "label when in stock"', () => client.waitAndSetValue(AddProductPage.pack_label_in_stock, data.common.qty_msg_stock));
    test('should set the "Label when out of stock (and back order allowed)"', () => client.availability());
    test('should set the "Availability date"', () => client.waitAndSetValue(AddProductPage.pack_availability_date, data.common.qty_date));
  }, 'product/product');


  scenario('Save Product', client => {
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'product/product');


  scenario('Check the virtual product in the Front Office', () => {
    scenario('Access to the Front Office', client => {
      test('should login successfully in the Front Office', () => client.accessToFO(AccessPageFO));
    }, 'product/product');
    scenario('Check that the pack product is well displayed in the Front Office', client => {
      test('should set the shop language to "English"', () => client.changeLanguage());
      test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
      test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
      test('should check that the product name is equal to "' + (data.virtual.name + date_time).toUpperCase() + '"', () => client.checkTextValue(productPage.product_name, (data.virtual.name + date_time).toUpperCase()));
      test('should check that the product price is equal to "€11.00"', () => client.checkTextValue(productPage.product_price, '€11.00'));
      test('should check that the product quantity is equal to "10"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', data.common.quantity));
      test('should check that the "summary" is equal to "' + data.common.summary + '"', () => client.checkTextValue(productPage.product_summary, data.common.summary));
      test('should check that the "description" is equal to "' + data.common.description + '"', () => client.checkTextValue(productPage.product_description, data.common.description));
      test('should check that the product reference is equal to "' + data.common.product_reference + '"', () => {
        return promise
          .then(() => client.waitForExistAndClick(productPage.product_detail_tab, 2000))
          .then(() => client.scrollTo(productPage.product_detail_tab, 180))
          .then(() => client.pause(2000))
          .then(() => client.checkTextValue(productPage.product_reference, data.common.product_reference));
      });
      test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity, "4"));
      test('should click on "Add to cart" button ', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button, 3000));
      test('should click on proceed to checkout button 1', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
      test('should set the quantity to "4" using the keyboard', () => client.waitAndSetValue(CheckoutOrderPage.quantity_input.replace('%NUMBER', 1), '4'));
      test('should click on proceed to checkout button 2', () => client.waitForExistAndClick(CheckoutOrderPage.proceed_to_checkout_button));
      scenario('Create new account', client => {
        test('should choose a "Social title"', () => client.waitForExistAndClick(accountPage.gender_radio_button));
        test('should set the "First name" input', () => client.waitAndSetValue(accountPage.firstname_input, 'test'));
        test('should set the "Last name" input', () => client.waitAndSetValue(accountPage.lastname_input, 'test'));
        test('should set the "Email" input', () => client.waitAndSetValue(accountPage.new_email_input, global.date_time + 'pub@prestashop.com'));
        test('should set the "Password" input', () => client.waitAndSetValue(accountPage.password_account_input, '123456789'));
        test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.new_customer_btn));
      }, 'common_client');
      scenario('Add new address', client => {
        test('should set the "company" input', () => client.waitAndSetValue(CheckoutOrderPage.company_input, 'prestashop'));
        test('should set "VAT number" input', () => client.waitAndSetValue(CheckoutOrderPage.vat_number_input, '0123456789'));
        test('should set "Address" input', () => client.waitAndSetValue(CheckoutOrderPage.address_input, '12 rue d\'amsterdam'));
        test('should set "Second address" input', () => client.waitAndSetValue(CheckoutOrderPage.address_second_input, 'RDC'));
        test('should set "Postal code" input', () => client.waitAndSetValue(CheckoutOrderPage.zip_code_input, '75009'));
        test('should set "City" input', () => client.waitAndSetValue(CheckoutOrderPage.city_input, 'Paris'));
        test('should set "Pays" input', () => client.waitAndSelectByVisibleText(CheckoutOrderPage.country_input, 'France'));
        test('should set "Home phone" input', () => client.waitAndSetValue(CheckoutOrderPage.phone_input, '0123456789'));
        test('should click on "Use this address for invoice too', () => client.waitForExistAndClick(CheckoutOrderPage.use_address_for_facturation_input));
        test('should click on "CONTINUE', () => client.waitForExistAndClick(accountPage.new_address_btn));

        scenario('Add Invoice Address', client => {
          test('should set the "company" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_company_input, 'prestashop'));
          test('should set "VAT number" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_vat_number_input, '0123456789'));
          test('should set "Address" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_address_input, '12 rue d\'amsterdam'));
          test('should set "Second address" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_address_second_input, 'RDC'));
          test('should set "Postal code" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_zip_code_input, '75009'));
          test('should set "City" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_city_input, 'Paris'));
          test('should set "Pays" input', () => client.waitAndSelectByVisibleText(CheckoutOrderPage.invoice_country_input, 'France'));
          test('should set "Home phone" input', () => client.waitAndSetValue(CheckoutOrderPage.invoice_phone_input, '0123456789'));
          test('should click on "CONTINUE" button', () => client.waitForExistAndClick(accountPage.new_address_btn));
        }, 'common_client');
      }, 'common_client');

      scenario('Choose "PAYMENT" method', client => {
        test('should set the payment type "Payment by bank wire"', () => client.waitForExistAndClick(CheckoutOrderPage.checkout_step4_payment_radio));
        test('should set "the condition to approve"', () => client.waitForExistAndClick(CheckoutOrderPage.condition_check_box));
        test('should click on order with an obligation to pay button', () => client.waitForExistAndClick(CheckoutOrderPage.confirmation_order_button));
        test('should check the order confirmation', () => {
          return promise
            .then(() => client.checkTextValue(CheckoutOrderPage.confirmation_order_message, 'YOUR ORDER IS CONFIRMED', "contain"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_product, "product"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_basic_price, "basic_price"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_total_price, "total_price"))
            .then(() => client.getTextInVar(CheckoutOrderPage.order_reference, "reference", true))
        });
        test('should check that the product name is equal to "' + (data.virtual.name + date_time).toUpperCase() + '"', () => client.checkTextValue(CheckoutOrderPage.confirmation_product_name.replace('%ID', 1), (data.virtual.name + date_time).toUpperCase()));
        test('should check that the product unit price is equal to "€11.00"', () => client.checkTextValue(CheckoutOrderPage.confirmation_product_unit_price.replace('%ID', 1), '€11.00'));
        test('should check that the total price is equal to "€44.00"', () => client.checkTextValue(CheckoutOrderPage.confirmation_product_total_price.replace('%ID', 1), '€44.00'));
        test('should check that the subtotal price is equal to "€44.00"', () => client.checkTextValue(CheckoutOrderPage.confirmation_sub_total_price, '€44.00'));
        test('should check that the payment method is "Bank transfer"', () => client.checkTextValue(CheckoutOrderPage.payment_method, 'Bank transfer', 'contain'));
        test('should get the order reference"', () => client.getTextInVar(CheckoutOrderPage.order_reference, 'orderReference'));
      }, 'common_client');

      scenario('Change order state in the Back Office', () => {
        scenario('Access to the Back Office', client => {
          test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
        }, 'common_client');
        scenario('Change order state', () => {
          test('should go to "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
          test('should search for the created order by reference', () => client.waitAndSetValue(OrderPage.search_by_reference_input, (global.tab['orderReference']).split(" ")[2]));
          test('should go to search order', () => client.waitForExistAndClick(OrderPage.search_order_button));
          test('should go to the order', () => client.scrollWaitForExistAndClick(OrderPage.view_order_button.replace('%NUMBER', 1), 150, 2000));
          test('should change order state to "payment accepted"', () => client.changeOrderState(OrderPage, 'Payment accepted'));
        }, 'common_client');
      }, 'common_client');

      scenario('Check if the maximum number of available downloads is reached, then we can not download it in the Front Office', () => {
        test('should log in successfully in FO', () => client.accessToFO(AccessPageFO));
        test('should go to the customer account', () => client.waitForExistAndClick(HomePage.your_account));
        test('should go to the order history and details', () => client.waitForExistAndClick(CustomerAccount.order_history_button));
        test('should click on details button', () => client.waitForExistAndClick(CustomerAccount.details_button.replace("%NUMBER", 1)));
        test('should download the file ' + (parseInt(data.virtual.allowed_number_to_download) + 1) + 'times', async () => {
          for (let i = 0; i <= data.virtual.allowed_number_to_download; i++)
            await client.waitForExistAndClick(CustomerAccount.product_name.replace("%PRODUCTNAME", (data.virtual.name + date_time).toUpperCase()));
        });
        test('should check if the maximum number of available downloads is reached', () => {
          return promise
            .then(() => client.alertAccept())
            .then(() => client.isVisible(HomePage.logo_home_page, 1000))
        });
      }, 'common_client');
      scenario('Change the date of downloading the file in the Back Office', () => {
        scenario('Access to the Back Office', client => {
          test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
        }, 'common_client');
        scenario('Change the download date of the file with an expired date', client => {
          test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
          test('should search for product by name', () => client.searchProductByName(data.virtual.name + date_time));
          test('should click on "Edit" button', () => client.waitForExistAndClick(ProductList.edit_button));
          test('should go to the "Virtual product" tab ', () => client.waitForExistAndClick(AddProductPage.product_quantities_tab, 1000));
          test('should add file "EXPIRATION DATE"', () => client.waitAndSetValue(AddProductPage.virtual_expiration_file_date, common.getCustomDate(-1)));
          test('should save attached file', () => client.scrollWaitForExistAndClick(AddProductPage.virtual_save_attached_file));
        }, 'product/check_product');
      }, 'common_client');
      scenario('Check if the max download date is exceeded, then we can not download it', () => {
        test('should log in successfully in FO', () => client.accessToFO(AccessPageFO));
        test('should go to the customer account', () => client.waitForExistAndClick(HomePage.your_account));
        test('should go to the order history and details', () => client.waitForExistAndClick(CustomerAccount.order_history_button));
        test('should click on details button', () => client.waitForExistAndClick(CustomerAccount.details_button.replace("%NUMBER", 1)));
        test('should download the file', () => client.waitForExistAndClick(CustomerAccount.product_name.replace("%PRODUCTNAME", (data.virtual.name + date_time).toUpperCase())));
        test('should check if the max download date is exceeded', () => {
          return promise
            .then(() => client.alertAccept())
            .then(() => client.isVisible(HomePage.logo_home_page, 1000))
        });
      }, 'common_client');
    }, 'common_client');
  }, 'common_client');
}, 'common_client', true);