/**
 * Created by fuweiping on 2017/6/30.
 */

import { browserHistory } from 'react-router';
import { RECEIVE_USER_ALL_NOTES, RECEIVE_NOTES, RECEIVE_NOTES_QUERY } from '../constants/appConstants';
import * as messages from '../constants/messageContants';
import settings from '../../../server/settings';
import { sendingRequest, setErrorMessages, setSuccessMessages } from './basicActions';
import request from '../utils/request';

export function receiveUserAllNotes(allUserNotes) {
    return {
        type: RECEIVE_USER_ALL_NOTES,
        allUserNotes
    }
}

export function receiveNotes(notes) {
    return {
        type: RECEIVE_NOTES,
        notes
    }
}

export function receiveQuery(query) {
    return {
        type: RECEIVE_NOTES_QUERY,
        query
    }
}

export function finishNote(newNote) {
    //console.log("2newNote: " + newNote);
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}`,
            method: 'POST',
            data: newNote,
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
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function publishNote(newNote) {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}`,
            method: 'POST',
            data: newNote,
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
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function getUserNotes(query) {
    return dispatch => {
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}`,
            method: 'GET',
            data: query,
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            return dispatch(receiveNotes(json));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function getUserAllNotes() {
    return dispatch => {
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}`,
            method: 'GET',
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            return dispatch(receiveUserAllNotes(json));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function deleteNote(note) {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}/${note._id}`,
            method: 'DELETE',
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            dispatch(setSuccessMessages(messages[json.success]));
            return dispatch(getUserAllNotes());
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function deleteNotesByQuery(query) {
    return dispatch => {
        //发送请求
        console.log(query);
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}`,
            method: 'DELETE',
            data: query,
            headers: {
                "x-access-token" : localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            dispatch(setSuccessMessages(messages[json.success]));
            return dispatch(getUserAllNotes());
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export  function updateNote(note) {
    return dispatch => {
        //发送请求
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/notes/${localStorage.getItem('username')}/${note._id}`,
            method: 'PUT',
            data: note,
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
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

export function getNotesByQuery(query) {
    return dispatch => {
        return request({
            url: `/notes/`,
            method: 'GET',
            data: query
        }).then(json => {
            dispatch(receiveQuery(json.query));
            return dispatch(receiveNotes(json.notes));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}