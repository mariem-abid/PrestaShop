module.exports = {
  CheckoutOrderPage: {
    add_to_cart_button: '//*[@id="add-to-cart-or-refresh"]//button[contains(@class, "add-to-cart")]',
    proceed_to_checkout_modal_button: '//*[@id="blockcart-modal"]//div[@class="cart-content-btn"]//a',
    continue_shopping_button: '//*[@id="blockcart-modal"]//div[@class="cart-content-btn"]//button',
    proceed_to_checkout_button: '//*[@id="main"]//div[contains(@class,"checkout")]//a',
    promo_code_link: '//*[@id="main"]//a[contains(@class, "promo-code")]',
    promo_code_input: '//*[@id="promo-code"]//input[contains(@class, "promo-input")]',
    promo_code_add_button: '//*[@id="promo-code"]//button[@type="submit"]/span[text()="Add"]',
    remove_voucher_button: '(//*[@id="main"]//a[@data-link-action="remove-voucher"])[2]',
    cart_subtotal_products: '//*[@id="cart-subtotal-products"]/span[2]',
    cart_subtotal_discount: '//*[@id="cart-subtotal-discount"]/span[2]',
    cart_total: '//*[@id="main"]//div[contains(@class, "cart-total")]/span[2]',
    checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]//button[contains(@name,"confirm-addresses")]',
    checkout_step3_continue_button: '//*[@id="js-delivery"]//button[@name="confirmDeliveryOption"]',
    checkout_step4_payment_radio: '//*[@id="payment-option-2"]',
    shipping_method_option: '//*[@id="delivery_option_2"]',
    message_textarea: '//*[@id="delivery_message"]',
    condition_check_box: '//*[@id="conditions_to_approve[terms-and-conditions]"]',
    confirmation_order_button: '//*[@id="payment-confirmation"]//button[@type="submit"]',
    confirmation_order_message: '//*[@id="content-hook_order_confirmation"]//h3[contains(@class,"card-title")]',
    order_product: '//*[@id="order-items"]//div[contains(@class,"details")]//span',
    order_reference: '//*[@id="order-details"]//li[1]',
    order_basic_price: '//*[@id="order-items"]//div[contains(@class,"qty")]/div/div[1]',
    order_total_price: '//*[@id="order-items"]/div[@class="order-confirmation-table"]//tr[1]/td[2]',
    order_shipping_prince_value: '//*[@id="order-items"]/div[@class="order-confirmation-table"]//tr[2]/td[2]',
    customer_name: '//*[@id="_desktop_user_info"]//a[@class="account"]/span',
    shipping_method: '//*[@id="order-details"]//li[3]',
    success_product_add_to_cart_modal: '//*[@id="myModalLabel"]',
    quantity_input: '//*[@id="main"]//div[contains(@class, "input-group")]//input[contains(@class, "js-cart-line-product-quantity")]',
    product_discount_details: '//*[@id="main"]//span[contains(@class, "discount")]',
    alert: '//*[@id="notifications"]//article[contains(@class, "alert-danger")]',
    cart_product_discount: '//*[@id="main"]//span[contains(@class,"discount-percentage")]',
    product_current_price: '//*[@class="current-price"]/span[@itemprop="price"]'
  },
  CustomerAccount: {
    order_history_button: '//*[@id="history-link"]',
    orders_list: '//*[@id="content"]',
    details_button: '//*[@id="content"]//tr[%NUMBER]/td[6]/a[contains(@data-link-action,"details")]',
    order_details_words: '//*[@id="main"]//h1',
    order_infos_block: '//*[@id="order-infos"]',
    order_status_block: '//*[@id="order-history"]',
    invoice_address_block: '//*[@id="invoice-address"]',
    order_products_block: '//*[@id="order-products"]',
    request_return_button: '//*[@id="order-return-form"]//button',
    add_message_block: '//*[@id="content"]/section[contains(@class,"message")]',
    message_input: '//*[@id="content"]//textarea[@name="msgText"]',
    send_button: '//*[@id="content"]//button[@name="submitMessage"]',
    success_panel: '//*[@id="notifications"]//article[@class="alert alert-success"]'
  }
};
