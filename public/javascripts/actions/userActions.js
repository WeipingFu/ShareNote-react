/**
 * Created by fuweiping on 2017/6/5.
 */

import { CHANGE_LOGIN_STATE } from '../constants/appConstants';
import * as messages from '../constants/messageContants';
import fetch from 'isomorphic-fetch';
import settings from '../../../server/settings';
import { sendingRequest, setErrorMessages,setSuccessMessages } from './basicActions';
import request from '../utils/request';

export function changeLoginState(userlogined, json) {
    return {
        type: CHANGE_LOGIN_STATE,
        userlogined,
        json
    };
}

export function register(user) {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/users/register`,
            method: 'POST',
            data: user
        }).then(json => {
            dispatch(sendingRequest(false));
            localStorage.setItem('token', json.token);
            localStorage.setItem('username', json.username);
            return dispatch(changeLoginState(true, json));
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function login(user) {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/users/login`,
            method: 'POST',
            data: user
        }).then(json => {
            dispatch(sendingRequest(false));
            localStorage.setItem('token', json.token);
            localStorage.setItem('username', json.username);
            return dispatch(changeLoginState(true, json));
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function logout() {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/users/logout/${localStorage.getItem('username')}`,
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            dispatch(setSuccessMessages(messages[json.success]));
            return dispatch(changeLoginState(false, json));
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function checkToken() {
    return dispatch => {
        return request({
            url: `/auth/users/${localStorage.getItem('username')}`,
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(json => {
            return dispatch(changeLoginState(true, json));
        }).catch(json => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return dispatch(changeLoginState(false, json));
        });
    }
}
