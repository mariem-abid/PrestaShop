module.exports = Object.assign(
    {
        CatalogPage: {
            menu_button: '//*[@id="subtab-AdminCatalog"]/a',
            success_panel: '//*[@id="content"]/div[@class="bootstrap"]/div[contains(@class, "success")]',
            select_all_product_button: '//*[@id="bulk_action_select_all"]',
            action_group_button: '//*[@id="product_bulk_menu"]',
            action_button: '(//*[@id="main-div"]//div[contains(@class, "bulk-catalog")]//a)[%ID]',
            green_validation: '//*[@id="main-div"]//div[contains(@class, "alert-success") and not(@style)]',
            product_status_icon: '(//*[@id="product_catalog_list"]//tbody/tr[%S]//i[contains(@class, "material-icons")])[1]',
            apply_button: '[name="products_filter_submit"]',
            delete_now_button: '//*[@id="catalog_deletion_modal"]//div[@class="modal-content"]/div[@class="modal-footer"]/button[@class="btn btn-primary btn-lg"]',
            delete_selection_button: '//*[@id="catalog-actions"]/div[@class="col-md-2"]//a[4]',
        }
    },
    require('./feature_submenu'),
    require('./category_submenu'),
    require('./attribute_submenu'),
    require('./Manufacturers'),
    require('./stocksubmenu'),
    require('./discount_submenu')
);
