const {HorizontalMenu}=require('../../selectors/FO/horizontal_menu');

module.exports = {
  menuHorizontal(){
    scenario('choose category which should be displayed on your page', client => {
      test('should choose the category', () => client.goToSubtabMenuPage(HorizontalMenu.category_menu.replace('%id', 3), HorizontalMenu.category_menu.replace('%id', 5)));
      test('should cheeck the category name', () => client.checkTextValue(HorizontalMenu.category, 'WOMEN'))
    }, 'common_client');
  },
};