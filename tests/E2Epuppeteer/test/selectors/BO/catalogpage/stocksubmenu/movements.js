module.exports = {
  Movement: {
    variation: '#app tr:nth-child(1) > td:nth-child(4) span[class*=qty-number] span',
    variation_value: '#app tr:nth-child(%P) > td:nth-child(4) span[class*=qty-number] span',
    quantity_value: '#app tr:nth-child(%P) td:nth-child(4) span[class*=qty-number]',
    type_value: '#app tr:nth-of-type(%P) > td:nth-of-type(3)',
    reference_value: '#app tr:nth-of-type(%P) > td:nth-of-type(2)',
    time_movement: '#app tr:nth-of-type(%P) > td:nth-of-type(5)',
    sort_data_time_icon: '#app table th:nth-of-type(5) div[data-sort-direction*=asc]',
    employee_value: '#app tr:nth-of-type(%P) > td:nth-of-type(6)',
    sort_data_time_icon_desc: '#app table th:nth-of-type(5) div[data-sort-direction*=desc]',
    sort_data_time_icon_asc: '#app table th:nth-of-type(5) div[data-sort-direction*=asc]',
    product_value: '#app tr:nth-of-type(%P) > td:nth-of-type(1) p',
    search_input: '#search div[class*=search-input search] input',
    search_button: '#search button[class*=search-button]',
    advanced_filters_button: '#filters-container  button[data-target="#filters"]',
    movement_type_select: '#filters div > select',
    searched_product_close_icon: '#search div[class*=tags-input] span.tag > i'
  }
};


