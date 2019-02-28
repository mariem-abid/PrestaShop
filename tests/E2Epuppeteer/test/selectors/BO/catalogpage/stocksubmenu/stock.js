module.exports = {
  Stock: {
    edit_quantity_input:'#app tr:nth-of-type(1) div[name="qty"] input',
    product_quantity_input: '#app tr:nth-child(%O) div[class*=edit-qty] input',
    product_quantity: '#app tr:nth-of-type(%O) > td:nth-of-type(7)',
    product_quantity_modified: '#app tr:nth-child(%O) button[class*=check-button]',
    available_quantity_modified: '#app tr:nth-child(%O) td:nth-child(7) span[class*=qty-update]',
    save_product_quantity_button: '#app tr:nth-child(%I) button[class*=check-button]',
    group_apply_button: '#app  button[class*=update]',
    add_quantity_button: '#app  tr:nth-child(%ITEM)  span[class*=ps-number-up]',
    remove_quantity_button: '#app  tr:nth-child(%ITEM)  span[class*=ps-number-down]',
    success_panel: '#growls',
    search_input: '#search  form > div > div.tags-input.search-input.search.d-flex.flex-wrap > input[class*=input]',
    search_button: '#search button[class*=search-button]',
    sort_product_icon: '#app table div[data-sort-direction*=asc]',
    check_sign: '#app button.check-button',
    physical_column: '#app div table.table tr:nth-of-type(%ID) td:nth-of-type(5)',
    green_validation: '#search > div:nth-of-type(2) > div > button',
    product_column: '#app div > table.table tr:nth-of-type(%O) > td:nth-of-type(1)',
    available_column: '#app div > table.table tr:nth-of-type(%O) > td:nth-of-type(7)',
    reference_product_column: '#app div > table.table tr:nth-of-type(%O) > td:nth-of-type(2)',
    reserved_column: '#app div > table.table tr:nth-of-type(%O) > td:nth-of-type(6)',
    product_selector: '//*[@id="app"]//table//tr//p[contains(text(),"%ProductName")]',// a changer
    success_hidden_panel: '#search div[class*=alert-box] div[class*=alert-success] > p > span'
  }
};
