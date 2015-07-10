define([
    'intern!object',
    '../utility/generator',
    '../config',
    './pages/accountPage',
    './pages/header'
],
function (registerSuite, generator, config, AccountPage, Header) {
    registerSuite(function(){
        var customer;
        var accountPage;
        var header;

        return {
            name: 'Sign in from account page',
            setup: function(){
                customer = generator.getExistingCustomer(config.existingId);
                accountPage = new AccountPage(this.remote);
                header = new Header(this.remote);
                return this.remote
                .clearCookies()
                .setTimeout('script', 60000)
                .setTimeout('page load', 60000)
                .setFindTimeout(50000)
                .get(config.URL + '/account');
            },

            'test account page login' : function() {
                return accountPage.login(customer);
            },

            'go to account from header' : function() {
                return header.goToAccount();
            },

            'click address tab from account page' : function() {
                return accountPage.clickAccountAddressTab();
            },

            'click address edit' : function() {
                return accountPage.editAddress();
            },

            'clear first name form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_firstname');
            },

            'fill out first name field' : function() {
                return accountPage.fillAddressField('Smith', 'dwfrm_profile_address_firstname');
            },

            'clear last name form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_lastname');
            },

            'fill out last name field' : function() {
                return accountPage.fillAddressField('Johnson', 'dwfrm_profile_address_lastname');
            },

            'clear address1 form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_address1');
            },

            'fill out address1 field' : function() {
                return accountPage.fillAddressField('321 Pecirt Yaw', 'dwfrm_profile_address_address1');
            },

            'clear address2 form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_address2');
            },

            'fill out address2 field' : function() {
                return accountPage.fillAddressField('Apt.#101', 'dwfrm_profile_address_address2');
            },

            'clear city form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_city');
            },

            'fill out city field' : function() {
                return accountPage.fillAddressField('Draper', 'dwfrm_profile_address_city');
            },

            'clear zip form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_zip');
            },

            'fill zip city field' : function() {
                return accountPage.fillAddressField('49048', 'dwfrm_profile_address_zip');
            },

            'clear phone form field' : function() {
                return accountPage.clearAddressField('dwfrm_profile_address_phone');
            },

            'fill phone city field' : function() {
                return accountPage.fillAddressField('(456) 456-4646', 'dwfrm_profile_address_phone');
            },

            'save address form' : function() {
                return accountPage.saveAddressForm();
            }

            //'logout from header' : function() {
            //    return header.logout(customer);
            // },
        };
    });
});
