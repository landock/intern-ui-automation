define({
    elementVisibleByClass: function (elem) {
        return function (elem) {
            var el = document ? document.getElementsByClassName(elem) : {};
            if (!el || el.length === 0) {
                return null;
            }
            el = el[0];
            return (el.offsetWidth > 0 && el.offsetHeight > 0) ? el : null;
        };
    }
});