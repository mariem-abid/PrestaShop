module.exports = {
  Brands: {
    new_brand_button: '//*[@id="page-header-desc-address-new_manufacturer"]',
    name_input: '//*[@id="name"]',
    short_desc_source_code_modal: '/html/body/div[5]/div[2]/div[2]/div/textarea',
    short_desc_source_code_modal_confirmation: '/html/body/div[5]/div[3]/div/div[2]/button',
    description: '(//*[@id="fieldset_0"]//div[contains(@class,"mce-tinymce")])[%NUMBER]',
    image_input: '//*[@id="logo"]',
    meta_title_input: '//*[@id="meta_title_1"]',
    meta_description_input: '//*[@id="meta_description_1"]',
    meta_keywords_input: '//*[@id="fieldset_0"]/div[2]/div[7]/div/div/div[1]/div[1]/div/input',   // '//*[@id="manufacturer_form"]/div/div[2]/div[7]/div/div/input',
    active_button: '//*[@id="manufacturer_form"]/div/div[2]/div[8]/div/span/label[1]',
    save_button: '//*[@id="manufacturer_form_submit_btn"]',
    short_description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[1]',
    description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[3]',
    update_button: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right open"]//a[@class="edit"]',
    reset_button: '//*[@id="table-manufacturer"]//button[@name="submitResetmanufacturer"]',
    delete_button: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right open"]//a[@class="delete"]',
    search_input_brand: '//*[@id="table-manufacturer"]/thead//input[@name="manufacturerFilter_name"]',
    search_button: '//*[@id="submitFilterButtonmanufacturer"]',
    dropdown_button: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right"]/button',
    number_addresses: '//*[@id="table-manufacturer"]//td[5]'
  }
};
