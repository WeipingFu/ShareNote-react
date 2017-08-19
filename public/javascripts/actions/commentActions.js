/**
 * Created by fuweiping on 2017/7/22.
 */

import { RECEIVE_NOTE_COMMENTS, RECEIVE_COMMENT_COMMENTS } from '../constants/appConstants';
import * as messages from '../constants/messageContants';
import settings from '../../../server/settings';
import { sendingRequest, setErrorMessages, setSuccessMessages } from './basicActions';
import {getUserAllNotes} from './noteActions';
import request from '../utils/request';

export function receiveNoteComments(comments) {
    return {
        type: 'RECEIVE_NOTE_COMMENTS',
        comments
    }
}

export function receiveCommentComments(comments) {
    return {
        type: 'RECEIVE_COMMENT_COMMENTS',
        comments
    }
}

export function getCommentsByNote(note_id) {
    return dispatch => {
        return request({
            url:  `/comments/${note_id}`,
            method: 'GET',
        }).then(json => {
            return dispatch(receiveNoteComments(json));
        }).catch(json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}

/*
export function getCommentsByComment(comment_id) {
    return dispatch => {
        return request({
            url:  `http://${settings.host}:${settings.serverPort}/comments/${comment_id}`,
            method: 'GET',
        }).then(json => {
            return dispatch(receiveCommentComments(json));
        }, json => {
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}
*/

export function addComment(comment, note_id) {
    return dispatch => {
        dispatch(sendingRequest(true));
        return request({
            url:  `/auth/comments/${localStorage.getItem('username')}`,
            method: 'POST',
            data: Object.assign({}, comment, {
                'note_id': note_id
            }),
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(json => {
            dispatch(sendingRequest(false));
            dispatch(setSuccessMessages(messages[json.success]));
            dispatch(getUserAllNotes());
            return dispatch(getCommentsByNote(note_id));
        }).catch(json => {
            dispatch(sendingRequest(false));
            return dispatch(setErrorMessages(messages[json.error]));
        });
    }
}