const Util = {
    /**
    Membersihkan tag HTML
    @param {string} text yang akan dibersihkan
    */
    clearHTML: function (s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    },

    /**
    Membersihkan tag Markdown
    @param {string} text yang akan dibersihkan
    */
    clearMarkdown: function (s) {
        return s
            .replace(/_/g, "\\_")
            .replace(/\*/g, "\\*")
            .replace(/\[/g, "\\[")
            .replace(/`/g, "\\`");
    },

    // untuk pengecekkan hak akses
    /* contoh: 
        var adminID = [1, 2, 3, 4]
        if ( tg.util.punyaAkses(adminID, msg.from.id) ) { .. }
    */
    isIN: function (array, index) {
        if (array.indexOf(index) > -1) {
            return true;
        } else {
            return false;
        }
    },

    forEach: function (obj, fn) {
        // Don't bother if no value provided
        if (obj === null || typeof obj === 'undefined') {
            return;
        }

        // Force an array if not already something iterable
        if (typeof obj !== 'object') {
            /*eslint no-param-reassign:0*/
            obj = [obj];
        }

        if (this.isArray(obj)) {
            // Iterate over array values
            for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj);
            }
        } else {
            // Iterate over object keys
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    fn.call(null, obj[key], key, obj);
                }
            }
        }
    },

    // allReplace('Hasanudin', {'a':4, 's': 5, 'n|u': 'o'}) //> H454oodio
    allReplace: function (str, obj) {
        var hasil = str;
        for (var x in obj) {
            hasil = hasil.replace(new RegExp(x, 'gi'), obj[x]);
        }
        return hasil;
    },

    random: function () {
        // random(list) : item
        if (arguments.length === 1 && this.isArray(arguments[0])) {
            var list = arguments[0];
            return list[Math.floor((Math.random() * list.length))];
        }

        // random(min, max) : integer
        if (arguments.length === 2 && typeof (arguments[0]) === 'number' && typeof (arguments[1]) === 'number') {
            var min = arguments[0];
            var max = arguments[1];
            if (max < min) { [min, max] = [max, min]; }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return false;
    },

    cleanObject(json) {
        const removeNull = (obj) => {
            Object.keys(obj).forEach(k =>
                (obj[k] && typeof obj[k] === 'object') && removeNull(obj[k])
                ||
                !obj[k] && delete obj[k]
            );
            return obj;
        };

        let result = removeNull(json);
        return result;
    },

}

Util.Button = {
    text: function (text, data) {
        return {
            'text': text,
            'callback_data': data
        }
    },
    // inline = alias dari text
    inline: function (text, data) {
        return {
            'text': text,
            'callback_data': data
        }
    },
    query: function (text, data) {
        return {
            'text': text,
            'switch_inline_query': data
        }
    },
    url: function (text, url) {
        return {
            'text': text,
            'url': url
        }
    }
}

Util.chat = {
    to_api: (chat_id) => {
        return parseInt('-100' + String(chat_id));
    },
    from_api: (chat_id) => {
        parseInt(String(chat_id).replace('-100', ''));
    }
}

Util.dateFormat = require('./date');

module.exports = Util