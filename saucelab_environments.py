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
