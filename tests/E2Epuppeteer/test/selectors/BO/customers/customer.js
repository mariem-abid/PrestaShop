module.exports = {
  Customer: {
    customer_menu: '#subtab-AdminParentCustomer > a',
    customers_subtab: '#subtab-AdminCustomers > a',
    new_customer_button: '#page-header-desc-customer-new_customer',
    social_title_button: '#gender_1',
    first_name_input: '#firstname',
    last_name_input: '#lastname',
    email_address_input: '#email',
    password_input: '#passwd',
    days_select: '#fieldset_0 select[name=days]',
    month_select: '#fieldset_0 select[name=months]',
    years_select: '#fieldset_0 select[name=years]',
    save_button: '#customer_form_submit_btn',
    customer_filter_by_email_input: '#form-customer input[name=customerFilter_email]',
    email_address_value: '#form-customer td:nth-of-type(%ID)',
    reset_button: '#table-customer button[name=submitResetcustomer]',
    edit_button: '#form-customer a[title=Edit]',
    dropdown_toggle: '#form-customer button[data-toggle=dropdown]',
    delete_button: '#form-customer a[title=Delete]',
    delete_first_option: '#deleteMode_real',
    delete_second_option: '#deleteMode_deleted',
    delete_confirmation_button: '#content input[value=Delete]',
    select_customer: '#form-customer input[name="customerBox[]"]',
    bulk_actions_button: '#bulk_action_menu_customer',
    bulk_actions_delete_button: '#form-customer div[class*=bulk-actions] a[onclick*=submitBulkdeletecustomer]',
    empty_list_icon: '#table-customer div[class*=list-empty-msg]',
    customer_link: '//*[@id="table-address"]//td[contains(text(),"%ID")]',//a changer
    Partner_offers: '#fieldset_0 label[for*=optin_on]',
    first_name_value:'#table-customer tr:nth-of-type(%ID) > td:nth-of-type(4)',
    last_name_value:'#table-customer tr:nth-of-type(%ID) > td:nth-of-type(5)',
    view_button: '#form-customer a[title=View]',
    valid_orders: '#container-customer  div:nth-child(2)  div:nth-child(1) span[class*=label-success]',
    total_amount: '#container-customer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div.panel > div > div:nth-child(1)',
  }
};