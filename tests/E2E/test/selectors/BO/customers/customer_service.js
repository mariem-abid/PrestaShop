module.exports = {
  Customer: {
    customer_service_menu: '//*[@id="subtab-AdminParentCustomerThreads"]/a/span',
    customer_filter_by_email_input: '//*[@id="table-customer_thread"]/thead//th/input[@name="customer_threadFilter_a!email"]',
    search_button: '//*[@id="submitFilterButtoncustomer_thread"]',
    icon: '//*[@id="table-customer_thread"]/tbody/tr/td[@class="text-right"]//button[@class="btn btn-default dropdown-toggle"]',
    delete_button: '//*[@id="table-customer_thread"]/tbody/tr/td[@class="text-right"]//div[@class="btn-group pull-right open"]//a[@class="delete"]',
    green_validation: '//*[@id="content"]//div[@class="alert alert-success"]',
  }

};
  