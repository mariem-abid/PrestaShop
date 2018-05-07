module.exports = {
  Brands: {
    new_brand_button: '//*[@id="page-header-desc-address-new_manufacturer"]',
    name_input: '//*[@id="name"]',
    description: '(//*[@id="fieldset_0"]//div[@class="mce-tinymce mce-container mce-panel"])[%NUMBER]',
    short_desc_source_code_modal: '/html/body/div[5]/div[2]/div[2]/div/textarea',
    short_desc_source_code_modal_confirmation: '/html/body/div[5]/div[3]/div/div[2]/button',
    image_input: '//*[@id="logo"]',
    meta_title_input: '//*[@id="meta_title_1"]',
    meta_description_input: '//*[@id="meta_description_1"]',
    meta_keywords_input: '//*[@id="fieldset_0"]//div[@class="translatable-field lang-1"]//div[@class="tagify-container"]//input[@type="text"]',
    active_button: '//*[@id="fieldset_0"]//label[@for="active_on"]',
    save_button: '//*[@id="manufacturer_form_submit_btn"]',
    search_button: '//*[@id="submitFilterButtonmanufacturer"]',
    icon: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right"]/button',
    update_button: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right open"]//a[@class="edit"]',
    reset_button: '//*[@id="table-manufacturer"]//button[@name="submitResetmanufacturer"]',
    delete_button: '//*[@id="table-manufacturer"]/tbody//div[@class="btn-group pull-right open"]//a[@class="delete"]',
    search_input_brand: '//*[@id="table-manufacturer"]/thead//input[@name="manufacturerFilter_name"]',
    number_addresses: '//*[@id="table-manufacturer"]//td[5]',
    short_description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[1]',
    description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[3]'
  }
};
