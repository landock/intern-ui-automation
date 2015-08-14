environments = [
    { "browserName": 'chrome', "version": '43.0', "platform": 'Windows 8.1' },
    { "browserName": 'internet explorer', "version": '8', "platform": 'Windows XP' },
    { "browserName": 'internet explorer', "version": '10', "platform": 'Windows 8' },
    { "browserName": 'internet explorer', "version": '11', "platform": 'Windows 8.1' } ,
    { "browserName": 'internet explorer', "version": '9', "platform": 'Windows 7' },
    { "browserName": 'firefox', "version": '38.0', "platform": 'Windows 8.1' },
    { "browserName": 'firefox', "version": '38.0', "platform": 'OS X 10.10' },
    { "browserName": 'chrome', "version": '43.0', "platform": 'OS X 10.10' },
    { "browserName": 'safari', "version": '8', "platform": 'OS X 10.10' }
]

tests = [

    "tests/functional/cart/addContactSolutionToCart",
    "tests/functional/account/resetPasswordEmail",
    "tests/functional/account/logoutFromAccountPage",
    "tests/functional/account/changePassword",
    "tests/functional/account/createNewAccount",
    "tests/functional/account/validateOrderHistory",
    "tests/functional/payment/checkoutAmericanExpress",
    "tests/functional/payment/checkoutDiscover",
    "tests/functional/payment/checkoutMastercard",
    "tests/functional/payment/checkoutVisa",
    "tests/functional/payment/checkoutPayPal",
    "tests/functional/signin/signInWithFacebook",
    "tests/functional/signin/signInWithGooglePlus",
    "tests/functional/signin/signInWithAmazon",
    "tests/functional/signin/signInFromHomePage",
    "tests/functional/signin/signInFromCart",
    "tests/functional/cart/addAndRemoveCouponCode",
    "tests/functional/cart/addContactLensesToCart",
    "tests/functional/cart/changeDoctor",
    "tests/functional/cart/changeQuantityOfItem",
    "tests/functional/cart/removeContactLensesFromCart",
    "tests/functional/cart/reorder",
    "tests/functional/address/addressEditingTest",
    "tests/functional/address/changeDefaultAddress",
]
