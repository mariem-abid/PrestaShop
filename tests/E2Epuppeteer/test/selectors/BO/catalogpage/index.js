module.exports = Object.assign(
  {
    CatalogPage: {
      success_panel: '#content > div.bootstrap > div[class*=success]',
      danger_panel: '#content > div.bootstrap > div[class*=danger]',
      select_all_product_button: '#catalog-actions > div:nth-child(2) > div > div > label',
      action_group_button: '#product_bulk_menu',
      action_button: '#catalog-actions a[onclick*=bulkProductAction]:nth-child(%ID)',
      green_validation: '#main-div  div[class="alert alert-success"][role=alert]',
      product_status_icon: '#product_catalog_list  tr:nth-child(%S) td:nth-child(10) i[class*=material-icons]',
      name_search_input: '#product_catalog_list  input[name=filter_column_name]',
      search_button: '#product_catalog_list button[name*=products_filter_submit]',
      dropdown_toggle: '#product_catalog_list button[class*=dropdown-toggle]',
      delete_button: '#product_catalog_list a[onclick*=delete]',
      delete_confirmation: '#catalog_deletion_modal button:nth-of-type(2)',
      close_delete_modal: '#catalog_deletion_modal  button.btn.btn-outline-secondary',
      reset_button: '#product_catalog_list button[name*=products_filter_reset]',
      search_result_message: '//*[@id="product_catalog_list"]//td[contains(text(), "There is no result for this search")]',//a changer
      deactivate_modal: '#catalog_deactivate_all_modal',
      activate_modal: '//*[@id="catalog_activate_all_progression"]//div[contains(text(), "Activating")]',//a changer
      duplicate_modal: '#catalog_duplicate_all_modal',
      delete_modal: '#catalog_deletion_modal'
    }
  },
  require('./feature_submenu'),
  require('./category_submenu'),
  require('./attribute_submenu'),
  require('./Manufacturers'),
  require('./stocksubmenu'),
  require('./discount_submenu'),
  require('./files')
);
