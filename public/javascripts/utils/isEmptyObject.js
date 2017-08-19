/**
 * Created by fuweiping on 2017/7/21.
 */

export default function isEmptyObject(obj) {
    var t;
    for (t in obj)
        return !1;
    return !0;
}