define({
    elementVisibleByClass: function (elem) {
        return function (elem) {
            var el = document ? document.getElementsByClassName(elem) : [];
            if (!el || el.length === 0) {
                return null;
            }
            el = el[0];
            return (el.offsetWidth > 0 && el.offsetHeight > 0) ? el : null;
        };
    },
    elementVisibleBySelector: function (selector) {
        return function (selector) {
            var el = document ? document.querySelector(selector) : {};
            if (!el) {
                return null;
            }
            return (el.offsetWidth > 0 && el.offsetHeight > 0) ? el : null;
        };
    }
});
