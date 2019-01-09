const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const commonProductScenarios = require('../../common_scenarios/product');
const commonFileScenarios = require('../../common_scenarios/file');

let fileData = {
    filename: 'Ps Picture',
    description: 'Picture of prestashop',
    file: 'prestashop.png'
  },
  fileEditedData = {
    filename: 'PS Developer Guide',
    description: 'The technical documentation of prestashop',
    file: 'prestashop_developer_guide.pdf'
  };

let productData = [{
  name: 'AttPr',
  quantity: "50",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'Attached product with file',
  options: {
    filename: [
      'Ps Picture',
    ]
  }
}, {
  name: 'AttPr2',
  quantity: "50",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'Attached product with file',
  options: {
    filename: [
      'Ps Picture',
      'PS Developer Guide'
    ]
  }
}];

scenario('Check the created file in the Front Office', () => {
  scenario('Open the browser and connect to the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  commonFileScenarios.createFile(fileData.filename, fileData.description, fileData.file);
  commonFileScenarios.checkFile(fileData.filename, fileData.description);
  commonProductScenarios.createProduct(AddProductPage, productData[0]);
  commonFileScenarios.checkFileFO(productData[0], fileData, true, false, 1);
  commonFileScenarios.editFile(fileData.filename, fileEditedData.filename, fileEditedData.description, fileEditedData.file);
  commonFileScenarios.checkFileFO(productData[0], fileEditedData, false, true, 1);
  commonFileScenarios.deleteFile(fileEditedData.filename);
  commonFileScenarios.checkFileFO(productData[0], fileEditedData, false, false, 1);
  commonFileScenarios.createFile(fileData.filename, fileData.description, fileData.file);
  commonFileScenarios.createFile(fileEditedData.filename, fileEditedData.description, fileEditedData.file);
  commonProductScenarios.createProduct(AddProductPage, productData[1]);
  commonFileScenarios.checkFileFO(productData[1], fileData, true, false, 2);
  commonFileScenarios.deleteFileWithBulkAction(fileEditedData.filename);
  commonFileScenarios.checkFileFO(productData[1], fileData, false, false, 2);
}, 'common_client', true);

