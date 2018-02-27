const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Menu} = require('../../../selectors/BO/menu.js');
const {ProductList} = require('../../../selectors/BO/add_product_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
let promise = Promise.resolve();

scenario('Catalog bulk action', () => {

    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'catalogbulkaction');

    scenario('Disable the product list', client => {
        test('should go to "Catalog" page', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu));
        test('should click on "Select all" radio', () => client.selectAllProducts(CatalogPage.select_all_product_button));
        test('should choose the "Deactivate selection" action', () => client.selectAction(CatalogPage, 2));
        test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.green_validation, 'close\nProduct(s) successfully deactivated.'));
        test('should check that the status of the first product is equal to "Clear"', () => client.checkTextValue(CatalogPage.product_status_icon.replace('%S', 1), 'clear'));
        test('should check that the status of the last product is equal to "Clear"', () => client.checkTextValue(CatalogPage.product_status_icon.replace('%S', 7), 'clear'));
    }, 'catalogbulkaction');

    scenario('Enable the product list', client => {
        test('should click on "Select all" radio', () => client.selectAllProducts(CatalogPage.select_all_product_button));
        test('should choose the "Activate selection" action', () => client.selectAction(CatalogPage, 1));
        test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.green_validation, 'close\nProduct(s) successfully activated.'));
        test('should check that the status of the first product is equal to "check"', () => client.checkTextValue(CatalogPage.product_status_icon.replace('%S', 1), 'check'));
        test('should check that the status of the last product is equal to "check"', () => client.checkTextValue(CatalogPage.product_status_icon.replace('%S', 7), 'check'));
    }, 'catalogbulkaction');

    scenario('Duplicate the product list', client => {
        test('should click on "Select all" radio', () => {
            return promise
                .then(() => client.isVisible(ProductList.pagination_products))
                .then(() => client.getProductsNumber(ProductList.pagination_products))
                .then(() => client.selectAllProducts(CatalogPage.select_all_product_button))
        });
        test('should choose the "Duplicate selection" action', () => client.selectAction(CatalogPage, 3));
        test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.green_validation, 'close\nProduct(s) successfully duplicated.'));
        test('should check that the products were duplicated', () => {
            return promise
                .then(() => client.isVisible(ProductList.pagination_products))
                .then(() => client.checkTextValue(ProductList.pagination_products, parseInt(productsNumber) + 19, 'contain'))
        });
    }, 'catalogbulkaction');

    scenario('Enable the product list', client => {
        test('should click on "Select all" radio', () => client.selectAllProducts(CatalogPage.select_all_product_button));
        test('should choose the "Activate selection" action', () => client.selectAction(CatalogPage, 1));
        test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.green_validation, 'close\nProduct(s) successfully activated.'));
    }, 'catalogbulkaction');

    scenario('Search Product', client => {
        test('should click on "Select all" radio', () => client.searchProductByName('copy'));
    }, 'product/check_product');

    scenario('delete  the  duplicate products', client => {

        test('should click on "Select all" radio', () => client.selectAllProducts(CatalogPage.select_all_product_button));
        test('should choose the "Bulk action" button', () => client.waitForExistAndClick(CatalogPage.action_group_button));


        test('should choose the "Delete selection" action', () => client.waitForExistAndClick(CatalogPage.delete_selection_button));
        test('should click on "delete" button', () => client.waitForVisibleAndClick(CatalogPage.delete_now_button));
        test('should verify the appearance of the green validation', () => {
            return promise
                .then(() => client.pause(80000))

                .then(() => client.checkTextValue(CatalogPage.green_validation, 'close\nProduct(s) successfully deleted.'));


        });
        test('should click on "reset" button', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));


    }, 'catalogbulkaction');


}, 'catalogbulkaction', true);