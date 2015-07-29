define([
    'intern!object',
    '../../config',
    '../../utility/generator',
    'intern/dojo/node!leadfoot/helpers/pollUntil',
    '../customCommands/AllCommands'
],
function (registerSuite, config, generator, pollUntil, Command) {
    registerSuite(function(){
        var customer
        var creditCard;
        var command;
        return {
            name: 'customer can view order history',
            setup: function() {
                customer = generator.getRandomCustomer();
                command = new Command(this.remote);
                creditCard = generator.getCreditCardNumber('MasterCard');
                return command
                .configureNewSession(60000)
                .get(config.URL + '/account');
            },
            
            'create new account': function(){
                return command
                .createNewAccount(customer);
            },
            
            'place contact lenses in cart and click continue' :function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo()
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            },
            
            'place contact lenses in cart and click continue' :function(){
                return command
                .get(config.URL + '/lens/acuvue-oasys-24')
                .fillInfo()
                .findAndClick('button[name="dwfrm_cart_checkoutCart"]')
            },
            
            'fill out address info' :function(){
                return command
                .fillAddressForm(customer)
                .findAndClick('button[name="dwfrm_billing_save"]')
            },
            
            'complete placing order' : function(){
                return command
                .fillDrInfo(customer)
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_number',creditCard)
                .setDropdown('#dwfrm_billing_paymentMethods_creditCard_year','2025')
                .enterInput('#dwfrm_billing_paymentMethods_creditCard_owner', customer.first_name +' '+customer.last_name)
                .findAndClick('.submit-cc')
                .waitForDeletedByClassName('modal-wrap');
            },
            
            'go to Order History' : function(){
                return command
                .get(config.URL+'/order-history')       
            },
            
            'click on view details' : function(){
                return command
                .findAndClick('.arrow-down-before, .summary-detail-toggler ,.ajax-order-history ,.ajax-success')
            },
            'assert that contacts are in previous order' : function(){
                return command
                .assertElementText('#order-history-container > div.order-item-container.active > div.order-item-details > div.row.col-9.products.margin-top-small > div.col.span-6.col-full-width-mobile > p > strong','Acuvue Oasys 24pk')
            }
            
            
            
            /*'enter and submit reset request' : function() {
                return command
                .enterInput('#dwfrm_requestpassword_email', customer.email)
                .findAndClick('button[name="dwfrm_requestpassword_send"]');
            },
            'go to mailinator inbox' : function(){
                return command
                .get('http://mailinator.com/inbox.jsp?to=1800contacts_email_reset_test')
            },
            'get ID of new email when it arrives' : function(){
                return command
                .then(pollUntil( function(){
                    var contains_less = 
                        $('li.row-fluid:nth-child(1) > a:nth-child(1) > div:nth-child(3)').text().indexOf('less');
                    return contains_less != -1 ? true : null;
                },[],60000,1000))
                .execute(function(){
                    return $('#mailcontainer > li:nth-child(1) > a').attr('onclick')
                })
                .then(function(attr){
                    console.log(attr)
                    var msg_id = attr.match(/showmail\('(.*)'\)/)[1];
                    return command
                    .get('https://mailinator.com/rendermail.jsp?msgid='+msg_id)
                })
            },
            'click on password reset link in email' : function(){
                return command
                .execute(function(){
                    return $('#wrapper > table > tbody > tr:nth-child(2) > td > font > center > table > tbody > tr > td > font > p:nth-child(2) > font > a').attr('href')
                })
                .then(function(link){
                    return command
                    .get(link)
                })
            },
            'enter new password and submit' : function(){
                return command
                .sleep(5000)
                .getCurrentUrl()
                .then(function(url){
                    console.log(url)
                })
                .enterInput('#dwfrm_resetpassword_password',newPassword)
                .enterInput('#dwfrm_resetpassword_passwordconfirm',newPassword)
                .findAndClick('button[name="dwfrm_resetpassword_send"]')
            },
            'logout' : function(){
                return command
                .logoutFromHeader()
                .assertLoggedOut()
            },
            'assert that new password works' : function(){
                return command
                .loginFromHeader({'email':customer.email,'password':newPassword})
                .assertLoggedIn()
            }*/
        }
    });
});
