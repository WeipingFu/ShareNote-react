/**
 * Created by fuweiping on 2017/7/21.
 */

module.exports = function isEmptyObject(obj) {
    var t;
    for (t in obj)
        return !1;
    return !0;
};