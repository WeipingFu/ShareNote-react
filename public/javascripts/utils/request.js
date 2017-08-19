/**
 * Created by fuweiping on 2017/7/15.
 */
import fetch from 'isomorphic-fetch';
import encodeQueryParam from './encodeQueryParam';

//设置请求body和Content-Type
function setRequestBodyByContentType(params, contentType, data) {
    switch (contentType) {
        case 'json':
            params.body = JSON.stringify(data);
            params.headers['Content-Type'] = 'application/json';
            break;
        case 'form':
            params.body = Object.keys(data).map(key => key + '=' + data[key]).join('&');
            params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            break;
        default:
            if(typeof contentType == 'string') {
                params.headers['Content-Type'] = contentType;
            }
            params.body = data;
            break;
    }
}

//处理请求后的结果
function fetchDone(acceptType, acceptTypeOnError, response) {
    function parseResponse(acceptType, response, callback) {
        switch (acceptType) {
            case 'text':
                return response.text().then(callback);
            case 'json':
                return response.json().then(callback);
            default:
                return callback(response.body);
        }
    }

    return new Promise((resolve, reject) => {
        if(response.ok || response.status === 304) {
            parseResponse(acceptType, response, resolve);
        } else {
            parseResponse(acceptTypeOnError, response, reject);
        }
    });
}

//accpet类型配置
var acceptTypes = {
    json: 'application/json, text/javascript, */*',
    text: 'text/javascript, */*',
    stream: 'application/octet-stream'
};

//请求函数
export default function request(options) {
    var url = options.url,
        method = (options.method || 'GET').toUpperCase(),
        data = options.data,
        contentType = options.contentType || 'json',
        acceptType = options.acceptType || 'json',
        acceptTypeOnError = options.acceptTypeOnError || 'json',
        headers = options.headers || null,
        accept = acceptTypes[acceptType],
        params = {
            method: method,
            headers: {},
            mode: 'cors'
        };

        if(accept) {
            params.headers['Accept'] = accept;
        }
        if(headers) {
            Object.keys(headers).forEach(key => params.headers[key] = headers[key]);
        }
        if(data) {
            if(!['GET', 'HEAD', 'DELETE'].includes(method)) {
                setRequestBodyByContentType(params, contentType, data);
            } else {
                if(url.indexOf('?') === -1) {
                    url = url + '?' + encodeQueryParam(data);
                } else {
                    url = url + '&' + encodeQueryParam(data);
                }
            }
        }

        return fetch(url, params).then(fetchDone.bind(null, acceptType, acceptTypeOnError));
}
