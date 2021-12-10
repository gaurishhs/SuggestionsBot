function newString(no) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = no;
            var randomstring = '';

            for (var x = 0; x < string_length; x++) {

                var letterOrNumber = Math.floor(Math.random() * 2);
                if (letterOrNumber == 0) {
                    var newNum = Math.floor(Math.random() * 9);
                    randomstring += newNum;
                } else {
                    var rnum = Math.floor(Math.random() * chars.length);
                    randomstring += chars.substring(rnum, rnum + 1);
                }

            }
            const uniqID = randomstring;
            return uniqID
}
module.exports = newString