/**
 * Created by fuweiping on 2017/7/24.
 */

import { browserHistory } from 'react-router';
import { RECEIVE_NOTEBOOKS } from '../constants/appConstants';
import * as messages from '../constants/messageContants';
import settings from '../../../server/settings';
import { sendingRequest, setErrorMessages, setSuccessMessages } from './basicActions';
import request from '../utils/request';

export function receiveNotebooks(notebooks) {
    return {
        type: RECEIVE_NOTEBOOKS,
        notebooks
    }
}

export function getNotebooks(query) {
    return dispatch => {
        return request({
            url:  `/auth/notebooks/${localStorage.getItem('username')}`,
            method: 'GET',
            data: query,
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            return dispatch(receiveNotebooks(json));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function addNotebook(notebook) {
    return dispatch => {
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notebooks/${localStorage.getItem('username')}`,
            method: 'POST',
            data: notebook,
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            setTimeout(function () {
                browserHistory.goBack();
            }, 2500);
            return dispatch(setSuccessMessages(messages[json.success]));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function deleteNotebook(bookname) {
    return dispatch => {
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notebooks/${localStorage.getItem('username')}/${bookname}`,
            method: 'DELETE',
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            dispatch(setSuccessMessages(messages[json.success]));
            return dispatch(getNotebooks());
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}