const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CreateOrder, OrderPage, CustomerInformations} = require('../../../selectors/BO/order');
const {OrderHistory} = require('../../../selectors/FO/order_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Currency} = require('../../../selectors/BO/international/currency');
const {accountPage} = require('../../../selectors/FO/add_account_page');
const order = require('../../common_scenarios/order');
let promise = Promise.resolve();
let dateFormat = require('dateformat');
global.date = dateFormat(global.date, "mm/dd/yyyy");
let customerData = {
  first_name: 'demo',
  last_name: 'demo',
  email_address: 'demo@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
};
let cartRuleData = {
  name: 'promo',
  description: 'super promo',
  total_available: 10,
  total_available_for_each_user: 10,
  type: 'percent',
  reduction: 10
};
let addressData = {
  address_alias: 'plop',
  first_name: 'Johnny',
  last_name: 'DEPP',
  address: '12,street test',
  postal_code: '75009',
  city: 'Paris'
};
let addressDataUpdated = {
  first_name: 'Johnnn',
  last_name: 'DOEEEE',
  company: 'My companyyy'
};

scenario('Order in the Back Office', client => {
  scenario('Create a new currency', client => {
    test('should open browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    test('should go to the "Localization" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu));
    test('should go to the "Currencies" page', () => client.waitForExistAndClick(Menu.Improve.International.currencies_tab));
    //  test('should click on "Add new currency" button', () => client.waitForExistAndClick(Currency.add_new_currency_button));
    //test('should choose the "Britsh Pound Sterling" currency', () => client.waitAndSelectByValue(Currency.currency_select, "GBP"));
    //test('should click on "Save" button', () => client.waitForExistAndClick(Currency.save_button));
    //  test('should enable  the currency', () => client.waitForExistAndClick(Currency.enable_currency));
    test('should click on "Update exchange rates" button', () => client.waitForExistAndClick(Currency.update_exchange_rates_button));
    test('should get the exchange rate', () => client.getTextInVar(CreateOrder.exchange_rate_GBP, "exchangeRate"));
  }, 'order');
  scenario('Create order in the back office', client => {
    test('should go to "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
    test('should click on "Add new order" button', () => client.waitForExistAndClick(CreateOrder.new_order_button, 1000));
    scenario('Create a customer', client => {
      test('should click on "Add new customer" button', () => client.waitForExistAndClick(CreateOrder.add_customer_button, 1000));
      order.createCustomer(customerData);
    }, 'order');
    scenario('Check the social title', client => {
      test('should click on "Details" button', () => client.waitForExistAndClick(CreateOrder.details_customer_button, 1000));
      test('should check the social title', () => {
        return promise
          .then(() => client.switchToFrameById(1, 2000))
          .then(() => client.checkTextValue(CreateOrder.social_title_details, 'Unknown'))
      });
      test('should check the last visit', () => {
        return promise
          .then(() => client.checkTextValue(CreateOrder.last_visit_details, 'Never'))
          .then(() => client.keys("Escape"))
      });
    }, 'order');
    scenario('Search for another customer', client => {
      test('should search for another customer', () => client.waitAndSetValue(CreateOrder.customer_search_input, 'pub@pres'));
      test('should click on "Choose" button', () => client.waitForExistAndClick(CreateOrder.choose_customer_button, 1000));
      test('should dislay the list of orders', () => client.waitForExistAndClick(CreateOrder.orders_button));
      test('should count the number of orders', () => client.getOrdersNumber(CreateOrder.orders_table));
      test('should click on the "Carts" button', () => client.waitForExistAndClick(CreateOrder.carts_button, 1000));
      test('should search a product', () => {
        return promise
          .then(() => client.waitAndSetValue(CreateOrder.product_search_input, 'note'))
          .then(() => client.waitForExistAndClick(CreateOrder.search_button, 1000));
      });
      test('should choose the "Hummingbird notebook" product', () => client.waitAndSelectByValue(CreateOrder.product_select, "18"));
      test('should choose the "Mountain fox notebook" product', () => client.waitAndSelectByValue(CreateOrder.product_select, "16"));
      test('should choose the "Squarred" combination', () => client.waitAndSelectByValue((CreateOrder.combination_select).replace('%NUMBER', 16), "30"));
      test('should set the "Quantity" input', () => client.waitAndSetValue(CreateOrder.quantity_cart_input, '3'));
      test('should click on "Add to cart" button', () => client.waitForExistAndClick(CreateOrder.add_to_cart_button, 1000));
      test('should delete the cart', () => client.waitForExistAndClick(CreateOrder.delete_product_button, 1000));
      test('should check that the product is well deleted', () => client.isNotExisting(CreateOrder.delete_product_button, 2000));
      test('should choose the "Brown bear notebook" product', () => client.waitAndSelectByValue(CreateOrder.product_select, "17"));
      test('should choose the "Plain" combination', () => client.waitAndSelectByValue((CreateOrder.combination_select).replace('%NUMBER', 17), "33"));
      test('should click on "Add to cart" button', () => client.waitForExistAndClick(CreateOrder.add_to_cart_button, 1000));
      test('should increase the quantity', () => {
        for (let i = 0; i <= 1; i++) {
          promise = client.waitForExistAndClick(CreateOrder.increase_quantity_button, 1000);
        }
        return promise
        // .then(() => client.clearElementAndSetValue(CreateOrder.quantity_product_input, '2'));
      });
      test('should decrease the quantity', () => {//a éliminer aprés avec le selecteur
        for (let i = 0; i <= 2; i++) {
          promise = client.waitForExistAndClick(CreateOrder.decrease_quantity_button, 1000);
        }
        return promise
      });
      test('should get the basic price', () => client.getAttributeInVar(CreateOrder.basic_price_value, 'value', "basicPriceEuro"));
      test('should get the quantity', () => client.getAttributeInVar(CreateOrder.quantity_product_input, 'value', "quantity", 2000));
      test('should get the total price', () => client.getTextInVar(CreateOrder.total_price, "totalPriceEuro"));
      test('should check the total price HT in Euro', () => client.checkTextValue(CreateOrder.total_price, (parseFloat(tab["basicPriceEuro"]) * parseInt(tab["quantity"])).toFixed(2), 'equal', 3000));
      test('should change currency to "GBP"', () => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "British Pound Sterling"));
      test('should get the basic price', () => client.getAttributeInVar(CreateOrder.basic_price_value, 'value', "basicPriceGBP", 2000));
      test('should check the total price HT in GBP', () => client.checkTextValue(CreateOrder.total_price, (parseFloat(tab["basicPriceGBP"]) * parseInt(tab["quantity"])).toFixed(2), 'equal', 3000));
      test('should get the total products from the cart', () => client.getTextInVar(CreateOrder.total_price, "totalProducts"))
      test('should change the currency to "Euro"', () => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "Euro"));
      test('should change the language to "French"', () => client.waitAndSelectByValue(CreateOrder.language_select, "2"));
      test('should check the product name', () => {
        return promise
          .then(() => client.pause(1000))
          .then(() => client.checkTextValue(CreateOrder.product_name, "Carnet de notes Ours brun", 'contain'));
      });
      test('should change the language to "English"', () => client.waitAndSelectByValue(CreateOrder.language_select, "1"));
    }, 'order');
    scenario('Voucher steps', client => {
      scenario('Add new cart rule', client => {
        order.createCartRule(cartRuleData, "promoCode");
      }, 'order');
      scenario('test the voucher', client => {
        test('should delete the voucher', () => client.waitForExistAndClick(CreateOrder.delete_voucher_button, 2000));
        test('should search the same voucher', () => {
          return promise
            .then(() => client.waitAndSetValue(CreateOrder.voucher_input, cartRuleData.name))
            .then(() => client.waitForVisibleAndClick(CreateOrder.search_voucher_option.replace("%T", tab["promoCode"])));
        });
        //voucher=((TotalPrice*taxe)+TotalPrice)/reduction
        test('should check the voucher in Euro', () => client.checkTextValue(CreateOrder.voucher_value, "€" + (((parseFloat(tab["totalPriceEuro"]) * 0.2) + parseFloat(tab["totalPriceEuro"])) / cartRuleData.reduction).toFixed(2), 'equal', 3000));
        test('should check the voucher in GBP', () => {
          return promise
            .then(() => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "British Pound Sterling"))
            .then(() => client.pause(2000))
            .then(() => client.getTextInVar(CreateOrder.total_price, "totalPriceGBP"))
            .then(() => client.checkTextValue(CreateOrder.voucher_value, "£" + (((parseFloat(tab["totalPriceGBP"]) * 0.2) + parseFloat(tab["totalPriceGBP"])) / cartRuleData.reduction).toFixed(2), 'equal', 3000));
        });
        test('should get the voucher', () => client.getTextInVar(CreateOrder.voucher_value, "voucherTTC"));
      }, 'order');
    }, 'order');
    scenario('Address steps', client => {
      scenario('Edit the delivery address', client => {
        order.editDeliveryAddress(addressDataUpdated);
      }, 'order');
      scenario('check that the delivered address is well updated', client => {
        test('should check that the first and the last name are updated', () => client.checkTextValue(CreateOrder.check_delivered_address, addressDataUpdated.first_name + " " + addressDataUpdated.last_name, 'contain', 1000));
        test('should check that the company is updated', () => client.checkTextValue(CreateOrder.check_delivered_address, addressDataUpdated.company, 'contain', 1000));
        test('should change the address', () => client.client.waitAndSelectByVisibleText(CreateOrder.delivery_address_select, "My address"));
        test('should check first name', () => client.checkTextValue(CreateOrder.check_delivered_address, 'John', 'contain', 1000));
      }, 'order');
      scenario('Add a new address', client => {
        order.addNewDeliveryAddress(addressData);
      }, 'order');
      scenario('Change the delivery and the invoice addresses ', client => {
        test('should change the invoice address', () => client.client.waitAndSelectByVisibleText(CreateOrder.invoice_address_select, "plop"));
        test('should check the first name', () => client.checkTextValue(CreateOrder.check_invoice_address, addressData.first_name, 'contain', 1000));
        test('should change the delivery address', () => client.client.waitAndSelectByVisibleText(CreateOrder.delivery_address_select, "Mon adresse"));
        test('should get the delivery address', () => {
          return promise
            .then(() => client.pause(2000))
            .then(() => client.getTextInVar(CreateOrder.check_delivered_address, "deliveryAddress"));
        });
        test('should get the invoice address', () => {
          return promise
            .then(() => client.pause(2000))
            .then(() => client.getTextInVar(CreateOrder.check_invoice_address, "invoiceAddress"));
        });
      }, 'order');
    }, 'order');
    scenario('Shipping steps', client => {
      test('should choose the delivery option', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.waitAndSelectByValue(CreateOrder.delivery_option, "2,"));
      });
      test('should check the shipping price TTC', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_excl, "totalShippingTaxExcl"))
          .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_incl, "totalShippingTTC"))
          .then(() => client.checkTextValue(CreateOrder.shipping_price_tax_incl, (((parseFloat(tab["totalShippingTaxExcl"]) * 0.2) + (parseFloat(tab["totalShippingTaxExcl"])))).toFixed(2), 'equal', 3000));
      });
      test('should get the shipping name', () => client.getTextInVar(CreateOrder.shipping_name.replace("%NUMBER", 2), "shippingName"));
      /*test('should enable the "Free shipping"', () => client.client.waitForVisibleAndClick(CreateOrder.enable_free_shipping));
      test('should check the free shipping price', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_excl, "freeShippingPrice"))
          .then(() => client.checkTextValue(CreateOrder.shipping_price_tax_incl, (parseFloat(tab["freeShippingPrice"])).toFixed(2), 'equal', 3000));
      });
      test('should disable the "Free shipping"', () => client.client.waitForVisibleAndClick(CreateOrder.disable_free_shipping));*/
    }, 'order');
    scenario('Summary cart ', client => {
      test('should get the total voucher HT', () => client.getTextInVar(CreateOrder.total_voucher_HT, "totalVoucher"));
      test('should get the total taxes', () => client.getTextInVar(CreateOrder.total_taxes, "totalTaxes"));
      test('should get the total price cart HT', () => client.getTextInVar(CreateOrder.total_cart_HT, "totalCartTaxExcl"));
      test('should get the total price cart TTC', () => client.getTextInVar(CreateOrder.total_cart_TTC, "totalCartTaxIncl"));
      test('should check the total products', () => client.checkTextValue(CreateOrder.total_product_HT, tab['totalProducts']));
      test('should check the total vouchers HT', () => client.checkTextValue(CreateOrder.total_voucher_HT, (parseFloat(tab['totalProducts']) / cartRuleData.reduction).toFixed(2)));
      //shippingPriceTaxIncl=shippingPriceTaxExcl*taxes+shippingPriceTaxExcl=>shippingPriceTaxIncl=shippingPriceTaxExcl(1+taxes)=>shippingPriceTaxExcl=shippingPriceTaxIncl/(1+taxes)
      test('should check the total shipping HT', () => client.checkTextValue(CreateOrder.shipping_price_tax_excl, (tab['totalShippingTTC'] / (1 + 0.2)).toFixed(2)));
      test('should check the total taxes', () => client.checkTextValue(CreateOrder.total_taxes, (parseFloat(tab['totalCartTaxIncl']) - parseFloat(tab['totalCartTaxExcl'])).toFixed(2)));
      test('should check the total price HT', () => client.checkTextValue(CreateOrder.total_cart_HT, ((parseFloat(tab['totalProducts']) + parseFloat(tab['totalShippingTaxExcl'])) - parseFloat(tab['totalVoucher'])).toFixed(2)));
      test('should check the total price TTC', () => client.checkTextValue(CreateOrder.total_cart_TTC, (parseFloat(tab['totalCartTaxExcl']) + parseFloat(tab['totalTaxes'])).toFixed(2)));
      test('should set the "Order message" input', () => client.waitAndSetValue(CreateOrder.order_message_textarea, 'test message'));
      test('should choose the "Bank transfer" payment method', () => client.waitAndSelectByValue(CreateOrder.payment, "ps_wirepayment"));
      test('should get the payment method', () => client.getTextInVar(CreateOrder.payment_method.replace("VALUE", "ps_wirepayment"), "paymentMethod"));
      test('should click on "Create the order" button', () => client.waitForVisibleAndClick(CreateOrder.create_order_button));
    }, 'order');
  }, 'order');
  scenario('Get the product informations', client => {
    test('should go to the product informations page', () => {
      return promise
        .then(() => client.waitForExistAndMiddleClick(OrderPage.product_information_page.replace("%NAME", "Brown bear notebook")))
        .then(() => client.switchWindow(1));
    });
    test('should click on "Combinations" tab', () => client.waitForExistAndClick(AddProductPage.product_combinations_tab));
    test('should get the product quantity', () => client.getAttributeInVar(AddProductPage.combination_quantity_input.replace("%NUMBER", 2).replace("%TEXT", "Plain"), 'value', "productQuantity"));
    test('should get the product weight', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.product_shipping_tab))
        .then(() => client.getAttributeInVar(AddProductPage.shipping_weight, 'value', "shippingWeight"));
    });
    test('should go back to the order page', () => client.switchWindow(0));
  }, 'order');
  scenario('Order page', client => {
    scenario('Get customer informations', client => {
      test('should go to the product information page', () => {
        return promise
          .then(() => client.pause(3000))
          .then(() => client.scrollTo(OrderPage.outside, 50))
          .then(() => client.waitForExistAndMiddleClick(OrderPage.customer_informations_link, 3000))
          .then(() => client.switchWindow(2));
      });
      test('should get the customer email', () => client.getTextInVar(CustomerInformations.customer_email, "customerEmail"));
      test('should get the customer registration date', () => client.getTextInVar(CustomerInformations.registration_date, "registrationDate"));
      test('should get the the number of the valid orders', () => client.getTextInVar(CustomerInformations.valid_orders, "validOrders"));
      test('should get the the total spent since registration', () => client.getTextInVar(CustomerInformations.orders_total_amount, "totalAmount"));
      test('should go back to the order page', () => client.switchWindow(0));
    }, 'order');
    scenario('check the order page', client => {
      test('should get the order reference', () => client.getTextInVar(OrderPage.order_reference, "orderReference"));
      test('should check the name and the last name of the customer', () => client.checkTextValue(OrderPage.customer_informations_link, 'MR. JOHN DOE'));
      test('should check the customer email', () => client.checkTextValue(OrderPage.customer_email, tab["customerEmail"].toLowerCase()));
      test('should check the customer account registered', () => client.checkTextValue(OrderPage.account_registered, tab["registrationDate"]));
      test('should check the number of valid orders placed', () => client.checkTextValue(OrderPage.valid_orders_placed, tab["validOrders"]));
      test('should check the total spent since registration in GBP ', () => client.checkTextValue(OrderPage.total_spent_since_registration, "£" + (tab["totalAmount"].split('€')[1] * tab["exchangeRate"]).toFixed(2)));
      test('should check the shipping date ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 1), date, 'contain'));
      test('should check the carrier name ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 3), tab["shippingName"].split(' -')[0]));
      test('should check the shipping weight ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 4), parseFloat(tab["shippingWeight"]).toFixed(2) + "kg"));
      test('should check the shipping cost ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 5), "£" + tab["totalShippingTTC"]));
      test('should check the tracking number ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 6), ""));
      test('should check the shipping address ', () => client.checkTextValue(OrderPage.shipping_address, "Edit\n" + tab["deliveryAddress"]));
      test('should click on "INVOICE ADDRESS" button ', () => client.waitForVisibleAndClick(OrderPage.invoice_address_button));
      test('should check the invoice address ', () => client.checkTextValue(OrderPage.invoice_address, "Edit\n" + tab["invoiceAddress"]));
      test('should check the text message', () => client.checkTextValue(OrderPage.message_order, 'test message'));
      test('should check the payment date ', () => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 1), date, 'contain'));
      test('should check the payment method', () => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 2), tab["paymentMethod"]));
      test('should check the payment amount', () => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 4), "£" + tab["totalCartTaxIncl"]));
      test('should check the total amount', () => client.checkTextValue(OrderPage.payment_amount, "£" + tab["totalCartTaxIncl"]));
      test('should check the product quantity', () => client.checkTextValue(OrderPage.order_quantity, "2"));
      test('should check the product available quantity', () => client.checkTextValue(OrderPage.available_quantity, tab["productQuantity"]));
      test('should check the total product TTC', () => client.checkTextValue(OrderPage.total_product_TTC, "£" + (((parseFloat(tab["basicPriceGBP"]) * 0.2) + parseFloat(tab["basicPriceGBP"])) * 2).toFixed(2), 'equal', 3000));
      test('should check the voucher name', () => client.checkTextValue(OrderPage.voucher_name, cartRuleData.name, 'contain', 1000));
      test('should check the voucher value', () => client.checkTextValue(OrderPage.voucher_value, "- £" + (((parseFloat(tab["totalPriceGBP"]) * 0.2) + parseFloat(tab["totalPriceGBP"])) / cartRuleData.reduction).toFixed(2), 'contain', 3000));
      scenario('Check summary order', client => {
        test('should check the total product', () => client.checkTextValue(OrderPage.total_price, "£" + (((parseFloat(tab["basicPriceGBP"]) * 0.2) + parseFloat(tab["basicPriceGBP"])) * 2).toFixed(2), 'equal', 3000));
        test('should get the total price cart TTC', () => client.getTextInVar(OrderPage.total_price, "totalPrice"));
        test('should check the total discount', () => client.checkTextValue(OrderPage.total_discount, "-£" + (((tab["totalPrice"].replace("£", "")) / cartRuleData.reduction)).toFixed(2)));
        test('should check the total shipping', () => client.checkTextValue(OrderPage.total_shipping_price, "£" + tab["totalShippingTTC"]));
        test('should check the total cart', () => client.checkTextValue(OrderPage.total_cart, "£" + ((parseFloat(tab['totalPrice'].replace("£", "")) + parseFloat(tab["totalShippingTTC"])) - (parseFloat(tab["voucherTTC"].replace("£", "")))).toFixed(2)));
      }, 'order');
    }, 'order');
  }, 'order');
  scenario('Check the created order in the front office', client => {
    test('should go to the front office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(3));
    });
    test('should connect to the customer account', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageFO.sign_in_button))
        .then(() => client.waitAndSetValue(AccessPageFO.login_input, 'pub@prestashop.com'))
        .then(() => client.waitAndSetValue(AccessPageFO.password_inputFO, '123456789'))
        .then(() => client.waitForExistAndClick(AccessPageFO.login_button));
    });
    test('should set the shop language to "English"', () => client.changeLanguage());// to do
    test('should go to the order history page', () => client.waitForExistAndClick(accountPage.order_history));
    test('should check the order reference', () => client.checkTextValue(OrderHistory.order_reference.replace("%NUMBER", 1), tab["orderReference"]));
    test('should check the order date', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 1), date));
    test('should check the total price', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 2), "£" + tab["totalCartTaxIncl"]));
    test('should check the payment method', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 3), tab["paymentMethod"]));
    test('should click on the "details" button ', () => client.waitForExistAndClick(OrderHistory.details_button.replace("%NUMBER", 1)));
    test('should check the order reference', () => client.checkTextValue(OrderHistory.order_details, tab["orderReference"], 'contain'));
  }, 'order');
}, 'order');
