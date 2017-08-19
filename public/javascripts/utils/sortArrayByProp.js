/**
 * Created by fuweiping on 2017/7/21.
 */

export default function sortArrayByProp(arr, prop, order) {
    let asc = true;
    if(order === 'desc') {
        asc = false;
    }
    arr.sort(function (a, b) {
        let v1 = a[prop],
            v2 = b[prop];

        if(prop === 'receiveAt' || prop === 'time') {            //根据日期排序
            v1 = Date.parse(v1);
            v2 = Date.parse(v2);
        }
        return asc ? v1 - v2 : v2 - v1;
    });
    return arr;
}