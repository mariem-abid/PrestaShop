const {DiscountSubMenu} = require('../../../selectors/BO/catalogpage/discount_submenu');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {ProductList} = require('../../../selectors/BO/add_product_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {productPage} = require('../../../selectors/FO/product_page');
const welcomeScenarios = require('../../common_scenarios/welcome');
let promise = Promise.resolve();

let cartRuleData = [
  {
    name: 'discount1',
    description: '2€ TTC less + free gift',
    type: 'amount',
    reduction: 2,
  }, {
    name: 'discount3',
    description: '5% on selected product',
    type: 'percent',
    reduction: 5,
  }, {
    name: 'discount4',
    description: '5% on specific product',
    type: 'percent',
    reduction: 5,
  }];

scenario('Test 1', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  welcomeScenarios.findAndCloseWelcomeModal();
  scenario('Create a new "Cart Rule"', client => {
    test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.discounts_submenu));
    test('should click on "Add new cart rule" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.new_cart_rule_button));
    test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.name_input, cartRuleData[0].name + date_time));
    test('should set the "Description" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.description_input, cartRuleData[0].description));
    test('should click on "Generate" button', () => {
      return promise
        .then(() => client.waitForExistAndClick(DiscountSubMenu.cartRules.generate_button))
        .then(() => client.getAttributeInVar(DiscountSubMenu.cartRules.code_input, 'value', 'code'));
    });
    test('should set the "Highlight" parameter to "Yes"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.highlight_label.replace("%T", "on")));
    test('should set the "Partial use" parameter to "No"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.partial_use_label.replace("%T", "off")));
    test('should click on "ACTIONS" tab', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.actions_tab));
    test('should click on "' + cartRuleData[0].type + '" radio', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_radio.replace("%T", cartRuleData[0].type), 2000));
    test('should set the "reduction" ' + cartRuleData[0].type + ' value', () => {
      return promise
        .then(() => client.waitAndSetValue(DiscountSubMenu.cartRules.reduction_input.replace("%T", cartRuleData[0].type), cartRuleData[0].reduction, 2000))
        .then(() => client.waitAndSelectByValue(DiscountSubMenu.cartRules.reduction_tax_select, '1'));
    });
    test('should apply a discount to order without shipping', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_to_radio.replace("%T", 'order'), 2000));
    test('should switch the "Free gift" to "Yes"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.free_gift));
    test('should search a standard product', () => client.waitAndSetValue(DiscountSubMenu.cartRules.search_product_input, 'mug', 1000));
    test('should select the product "mug the adventure begins"', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitAndSelectByValue(DiscountSubMenu.cartRules.matching_product_select, '7'));
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.save_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'common_client');
  scenario('Go to the Front Office and check the created cart rule', client => {
    test('should go to the Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname, 1000))
        .then(() => client.switchWindow(1));
    });
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product' + ' mug the best is yet to come', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, 'mug the best is yet to come'));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.first_product_name_link));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'code'));
    test('should verify that there are 2 products in the cart', () => client.checkTextValue(CheckoutOrderPage.products_number, '2', 'contain', 1000));
    test('should verify that the quantity of "mug the best is yet to come" product is equal to "1" ', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input.replace('%NUMBER', 1), 'value', '1'));
    test('should verify that the price of "mug the best is yet to come" product is equal to "14,28€" ', () => client.checkTextValue(CheckoutOrderPage.product_total_price.replace('%NUMBER', 1), '€14.28'));
    test('should check that the gift product is existing in the cart', () => client.isExisting(CheckoutOrderPage.product_name.replace('%NUMBER', 1)));
    /*** Related issue here https://github.com/PrestaShop/PrestaShop/issues/9757 ***/
    test('should check that the price of the 2 items is equal to "14.28€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_products, "€14.28"));
    test('should check that the discount is equal to "2.00€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_discount, "€2.00"));
    test('should check that the ' + cartRuleData[0].name + date_time + ' is equal to "2.00€" ', () => client.checkTextValue(CheckoutOrderPage.discount_value_block_promo, '-€2.00'));
    test('should check that the delivery is "Free" ', () => client.checkTextValue(CheckoutOrderPage.shipping_value, 'Free'));
    test('should check that the Total (tax incl.) is equal to "12.28€" ', () => client.checkTextValue(CheckoutOrderPage.cart_total, '€12.28'));
  }, 'discount');
}, 'common_client', true);

scenario('Test 2', () => {
  scenario('Login in the Front Office and check the created cart rule', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product' + ' mug the adventure begins', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, 'mug the adventure begins'));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.first_product_name_link));
    test('should add a second product to the cart', () => client.waitForExistAndClick(productPage.arrow_button_up));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should verify that there are 2 products in the cart', () => client.checkTextValue(CheckoutOrderPage.products_number, '2', 'contain', 1000));
    test('should verify that the quantity of "mug the adventure begins" product is equal to "2" ', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input.replace('%NUMBER', 1), 'value', '2'));
    test('should verify that the price of "mug the best is yet to come" products is equal to "28.56€" ', () => client.checkTextValue(CheckoutOrderPage.product_total_price.replace('%NUMBER', 1), '€28.56'));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'code'));
    test('should check that the gift product is existing in the cart', () => client.checkTextValue(CheckoutOrderPage.products_number, '3', 'contain', 1000));
    /*** Related issue here https://github.com/PrestaShop/PrestaShop/issues/9757 ***/
    test('should check that the price of the 3 items is equal to "28.56€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_products, "€28.56"));
    test('should check that the discount is equal to "2.00€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_discount, "€2.00"));
    test('should check that the ' + cartRuleData[0].name + date_time + ' is equal to "2.00€"', () => client.checkTextValue(CheckoutOrderPage.discount_value_block_promo, "-€2.00"));
    test('should check that the delivery is "Free" ', () => client.checkTextValue(CheckoutOrderPage.shipping_value, 'Free'));
    test('should check that the Total (tax incl.) is equal to "26.56€" ', () => client.checkTextValue(CheckoutOrderPage.cart_total, '€26.56'));
  }, 'discount');
}, 'common_client', true);

scenario('Test 3', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Duplicate the mug the adventure begins product', client => {
    test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
    test('should search for product by name', () => client.searchProductByName("mug the adventure begins"));
    test('should click on "Dropdown > Duplicate" button', () => {
      return promise
        .then(() => client.waitForExistAndClick(ProductList.dropdown_button.replace('%POS', 1)))
        .then(() => client.waitForVisibleAndClick(ProductList.action_duplicate_button.replace('%POS', 1)));
    });
    test('should get the product name', () => client.getAttributeInVar(AddProductPage.product_name_input, 'value', 'productName'));
    test('should set the "Reference" input', () => client.waitAndSetValue(AddProductPage.product_reference, 'copy'));
    test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, "10"));
    test('should click on "Pricing"', () => client.waitForExistAndClick(AddProductPage.product_pricing_tab));
    test('should select tax rule 5.5%', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.tax_rule_value_list))
        .then(() => client.waitForVisibleAndClick(AddProductPage.tax_rule_value.replace('%ID', 'FR Taux réduit (5.5%)')));
    });
    test('should define product price tax included for 15.90€', () => client.waitAndSetValue(AddProductPage.retail_price_TTC_input, "15.9"));
    test('should switch the product online', () => {
      return promise
        .then(() => client.waitForSymfonyToolbar(AddProductPage, 2000))
        .then(() => client.waitForExistAndClick(AddProductPage.product_online_toggle, 3000))
    });
  }, 'product/check_product');
  scenario('Create a new "Cart Rule"', client => {
    test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.discounts_submenu));
    test('should click on "Add new cart rule" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.new_cart_rule_button));
    test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.name_input, cartRuleData[1].name + date_time));
    test('should set the "Description" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.description_input, cartRuleData[1].description));
    test('should click on "Generate" button', () => {
      return promise
        .then(() => client.waitForExistAndClick(DiscountSubMenu.cartRules.generate_button))
        .then(() => client.getAttributeInVar(DiscountSubMenu.cartRules.code_input, 'value', 'code2'));
    });
    test('should set the "Highlight" parameter to "Yes"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.highlight_label.replace("%T", "on")));
    test('should set the "Partial use" parameter to "No"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.partial_use_label.replace("%T", "off")));
    test('should click on "CONDITIONS" tab', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.conditions_tab));
    test('should choose the product selection', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.restriction_input.replace('%T', 'product')));
    test('should click on "Product selection" ', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.product_selection, 1000));
    test('should add a rule concerning "product" ', () => client.waitAndSelectByValue(DiscountSubMenu.cartRules.add_rule_select, "products"));
    test('should click on "Add" ', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.click_add, 1000));
    test('should click on "Choose" ', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.click_choose, 1000));
    test('should select the product', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitForExistAndClick(DiscountSubMenu.cartRules.select_product_name.replace("%VALUE", global.tab['productName'])));
    });
    test('should click on "Add"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.add_selected_product));
    test('should close the modal', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.close_modal));
    test('should click on "ACTIONS" tab', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.actions_tab, 1000));
    test('should click on "' + cartRuleData[1].type + '" radio', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_radio.replace("%T", cartRuleData[1].type), 2000));
    test('should set the "reduction" ' + cartRuleData[1].type + ' value', () => client.waitAndSetValue(DiscountSubMenu.cartRules.reduction_input.replace("%T", cartRuleData[1].type), cartRuleData[1].reduction, 2000));
    test('should apply a discount to selected product', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_to_radio.replace("%T", 'selection'), 2000));
    test('should click on "Save" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.save_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'common_client');
  scenario('Go to the Front Office and check the created cart rule', client => {
    test('should go to the Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname, 1000))
        .then(() => client.switchWindow(1));
    });
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product' + ' mug the best is yet to come', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, global.tab['productName']));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.first_product_name_link));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'code2'));
    test('should verify that there is 1 product in the cart', () => client.checkTextValue(CheckoutOrderPage.products_number, '1', 'contain', 1000));
    test('should verify that the quantity of the product is equal to "1" ', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input.replace('%NUMBER', 1), 'value', '1'));
    test('should verify that the price of the product is equal to "15.90€" ', () => client.checkTextValue(CheckoutOrderPage.product_total_price.replace('%NUMBER', 1), '€15.90'));
    test('should check that the price of the  item is equal to "15.90€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_products, "€15.90"));
    test('should check that the discount is equal to "0.80€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_discount, "€0.80"));
    test('should check that the ' + cartRuleData[1].name + date_time + ' is equal to "-5%" ', () => client.checkTextValue(CheckoutOrderPage.discount_value_block_promo, '-5.00%'));
    test('should check that the delivery is "Free" ', () => client.checkTextValue(CheckoutOrderPage.shipping_value, 'Free'));
    /*** Related issue here https://github.com/PrestaShop/PrestaShop/issues/9779 ***/
    test('should check that the Total (tax incl.) is equal to "15.10€" ', () => client.checkTextValue(CheckoutOrderPage.cart_total, '€15.10'));
  }, 'discount');
}, 'common_client', true);

scenario('Test 4', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Login in the Back Office', client => {
    test('should go to "Cart Rules" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.discounts_submenu));
    test('should click on "Add new cart rule" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.new_cart_rule_button));
    test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.name_input, cartRuleData[2].name + date_time));
    test('should set the "Description" input', () => client.waitAndSetValue(DiscountSubMenu.cartRules.description_input, cartRuleData[2].description));
    test('should click on "Generate" button', () => {
      return promise
        .then(() => client.waitForExistAndClick(DiscountSubMenu.cartRules.generate_button))
        .then(() => client.getAttributeInVar(DiscountSubMenu.cartRules.code_input, 'value', 'code3'));
    });
    test('should set the "Highlight" parameter to "Yes"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.highlight_label.replace("%T", "on")));
    test('should set the "Partial use" parameter to "No"', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.partial_use_label.replace("%T", "off")));
    test('should click on "ACTIONS" tab', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.actions_tab));
    test('should click on "' + cartRuleData[2].type + '" radio', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_radio.replace("%T", cartRuleData[2].type), 2000));
    test('should set the "reduction" ' + cartRuleData[2].type + ' value', () => client.waitAndSetValue(DiscountSubMenu.cartRules.reduction_input.replace("%T", cartRuleData[2].type), cartRuleData[2].reduction, 2000));
    test('should apply a discount to specific product', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.apply_discount_to_radio.replace("%T", 'product'), 2000));
    test('should select the product', () => {
      return promise
        .then(() => client.waitAndSetValue(DiscountSubMenu.cartRules.reduction_product_filter, global.tab['productName'], 2000))
        .then(() => client.waitForExistAndClick(DiscountSubMenu.cartRules.select_first_product.replace('%NUMBER', 1)));
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(DiscountSubMenu.cartRules.save_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
  }, 'common_client');
  scenario('Go to the Front Office and check the created cart rule', client => {
    test('should go to the Front Office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname, 1000))
        .then(() => client.switchWindow(1));
    });
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product' + ' mug the best is yet to come', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, global.tab['productName']));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.first_product_name_link));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "PROCEED TO CHECKOUT" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Have a promo code?" link', () => client.waitForExistAndClick(CheckoutOrderPage.promo_code_link, 4000));
    test('should set the "Promo code" input', () => client.setPromoCode(CheckoutOrderPage.promo_code_input, CheckoutOrderPage.promo_code_add_button, 'code3'));
    test('should verify that there is 1 product in the cart', () => client.checkTextValue(CheckoutOrderPage.products_number, '1', 'contain', 1000));
    test('should verify that the quantity of the product is equal to "1" ', () => client.checkAttributeValue(CheckoutOrderPage.quantity_input.replace('%NUMBER', 1), 'value', '1'));
    test('should verify that the price of the product is equal to "15.90€" ', () => client.checkTextValue(CheckoutOrderPage.product_total_price.replace('%NUMBER', 1), '€15.90'));
    test('should check that the price of the  item is equal to "15.90€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_products, "€15.90"));
    test('should check that the discount is equal to "0.80€"', () => client.checkTextValue(CheckoutOrderPage.cart_subtotal_discount, "€0.80"));
    test('should check that the ' + cartRuleData[2].name + date_time + ' is equal to "-5%" ', () => client.checkTextValue(CheckoutOrderPage.discount_value_block_promo, '-5.00%'));
    test('should check that the delivery is "Free" ', () => client.checkTextValue(CheckoutOrderPage.shipping_value, 'Free'));
    /*** Related issue here https://github.com/PrestaShop/PrestaShop/issues/9779 ***/
    test('should check that the Total (tax incl.) is equal to "15.10€" ', () => client.checkTextValue(CheckoutOrderPage.cart_total, '€15.10'));
    test('should go back to the Back Office ', () => client.switchWindow(0));
  }, 'discount');
  scenario('Delete the duplicated product', client => {
    test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
    test('should click on "Reset" button', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter, 1000));
    test('should search for the created product', () => client.searchProductByName(global.tab['productName']));
    test('should click on "Dropdown toggle" button', () => client.waitForExistAndClick(ProductList.dropdown_button.replace('%POS', '1')));
    test('should click on "Delete" action', () => client.waitForExistAndClick(ProductList.action_delete_button.replace('%POS', '1')));
    test('should click on "Delete now" modal button', () => client.waitForVisibleAndClick(ProductList.delete_now_modal_button, 1000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.success_panel, 'Product successfully deleted.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
  }, 'product/check_product');
}, 'common_client', true);

