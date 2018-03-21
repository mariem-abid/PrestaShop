module.exports = {
  ContactSubMenu: {
    contact_link: '//*[@id="contact-link"]/a',
    subject: '//*[@id="content"]/section/form/section/div[2]/div/select',
    send_button: '//*[@id="content"]/section/form/footer/input',
    message: '//*[@id="content"]/section/form/section/div[@class="form-group row"]/div[@class="col-md-9"]/textarea',
    green_validation: '//*[@id="content"]/section/form/div',
    notification_icon: '//*[@id="notification"]/a/i',
    message_tab: '//*[@id="messages-tab"]',
    customer_message: '//*[@id="messages-notifications"]/div/a',
    customer_name: '//*[@id="messages-notifications"]/div/a/strong',
    customer_check: '//*[@id="table-customer_thread"]//td[%id]'
  }
}
