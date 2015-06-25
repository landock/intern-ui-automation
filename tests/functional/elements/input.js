define(function () {

    function Input(remote){
        this.remote = remote;
    }

    Input.prototype = {
        constructor: Input,
        'enterInput': function(id, text){
            return this.remote
                .execute(function(id2, txt, selector){
                    $(id2).removeClass(selector).val(txt).trigger('change');
                }, [id, text, 'placeholder'])
            .end()
                .findByCssSelector(id)
                .getProperty('value')
                .then(function(text){
                    return text;
                });
        },
        'enterNonPlaceholderInput': function(id, text){
            return this.remote
                .findByCssSelector(id)
                .type(text)
                .getProperty('value')
                .then(function(text){
                    return text;
                });
        }
    };
    return Input;
});