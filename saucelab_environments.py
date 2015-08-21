ENVIRONMENT_COUNT = 8 
MAX_VMS = 50
MAX_TUNNELS = 30

TESTS = [

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

MOBILE_TESTS = [
    'tests/functional/mobile/mobileAddContactLensesToCart',
    'tests/functional/mobile/mobileAddContactSolutionToCart',
    'tests/functional/mobile/mobileAddRemoveCoupon',
    'tests/functional/mobile/mobileAddressEditingTest',
    'tests/functional/mobile/mobileChangeDefaultAddressTest', 
    'tests/functional/mobile/mobileChangeItemQuantityInCart',
    'tests/functional/mobile/mobileChangePassword',
    'tests/functional/mobile/mobileCheckoutAmericanExpress',
    'tests/functional/mobile/mobileCheckoutDiscover',
    'tests/functional/mobile/mobileCheckoutMasterCard',
    'tests/functional/mobile/mobileCheckoutPayPal',
    'tests/functional/mobile/mobileCheckoutVisa',
    'tests/functional/mobile/mobileCreateNewAccount',
    'tests/functional/mobile/mobileRe-Order',
    'tests/functional/mobile/mobileRemoveItemFromCart',
    'tests/functional/mobile/mobileResetPasswordTest',
    'tests/functional/mobile/mobileSignInFromCart',
    'tests/functional/mobile/mobileSignInTest',
    'tests/functional/mobile/mobileValidateOrderHistory'
]
