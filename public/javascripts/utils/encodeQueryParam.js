/**
 * Created by fuweiping on 2017/7/15.
 */

function isFunction(obj){
    typeof obj === "function";
}

//编码
export default function encodeQueryParam(param = {}){
    var s = [],
        add = function( key, value ) {
            // If value is a function, invoke it and return its value
            value = isFunction( value ) ? value() : ( value == null ? "" : value );
            //去掉对参数名的编码
            s[ s.length ] = key + "=" + encodeURIComponent( value );
        };

    if( typeof param === "object"  ) {
        Object.keys(param).forEach(function(key){
            if(param[ key ] != ""){
                add( key, param[ key ] );
            }
        });
    }

    return s.join( "&" );
}
