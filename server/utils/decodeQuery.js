/**
 * Created by fuweiping on 2017/7/21.
 */

module.exports = function decodeQueryParam(searchStr = ""){
    var str = searchStr.indexOf("?") == -1 ? searchStr : searchStr.substr(1),
        arr = str == "" ? [] : str.split("&"),
        param = {};

    arr.forEach(function(val){
        let itemArr = val.split("=");
        param[itemArr[0]] = decodeURIComponent(itemArr[1]);
    });

    return param;
};