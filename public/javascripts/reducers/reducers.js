/**
 * Created by fuweiping on 2017/6/6.
 */

import { SENDING_REQUEST, SET_ERROR_MESSAGE, CHANGE_LOGIN_STATE, RECEIVE_USER_ALL_NOTES, RECEIVE_NOTES, RECEIVE_NOTES_QUERY, SET_SUCCESS_MESSAGE, RECEIVE_NOTEBOOKS, RECEIVE_NOTE_COMMENTS, RECEIVE_COMMENT_COMMENTS } from '../constants/appConstants';
import { combineReducers } from 'redux';

function sendingMessage(state = {
    sendingRequest: false,
    errorMessage: '',
    successMessage: ''
}, action) {
    switch (action.type) {
        case SENDING_REQUEST:
            return Object.assign({}, state, {
                sendingRequest: action.isSending
            });
        case SET_ERROR_MESSAGE:
            return Object.assign({}, state, {
                sendingRequest: false,
                errorMessage: action.errorMessage
            });
        case SET_SUCCESS_MESSAGE:
            return Object.assign({}, state, {
                sendingRequest: false,
                errorMessage: '',
                successMessage: action.successMessage
            });
        default:
            return state;
    }
}
function userReducer(state={
    userlogined: false,
    json: {
        username: '',
        token: ''
    }
}, action) {
    switch (action.type) {
        case CHANGE_LOGIN_STATE:
            return Object.assign({}, state, {
                userlogined: action.userlogined,
                json: action.json
            });
        default:
            return state;
    }
}

function notesReducer(state = {
    allUserNotes: [],
    notes: [],
    query: {}
}, action) {
    switch (action.type) {
        case RECEIVE_NOTES:
            return Object.assign({}, state, {
                notes: action.notes
            });
        case RECEIVE_USER_ALL_NOTES:
            return Object.assign({}, state, {
                allUserNotes: action.allUserNotes
            });
        case RECEIVE_NOTES_QUERY:
            return Object.assign({}, state, {
                query: action.query
            });
        default:
            return state;
    }
}

function notebooksReducer(state = {
    notebooks: []
}, action) {
    switch (action.type) {
        case RECEIVE_NOTEBOOKS:
            return Object.assign({}, state, {
                notebooks: action.notebooks
            });
        default:
            return state;
    }
}

function commentsReducer(state = {
    noteComments: [],
    CommentComments: []
}, action) {
    switch (action.type) {
        case RECEIVE_NOTE_COMMENTS:
            return Object.assign({}, state, {
                noteComments: action.comments
            });
        case RECEIVE_COMMENT_COMMENTS:
            return Object.assign({}, state, {
                CommentComments: action.comments
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    sendingMessage,
    userReducer,
    notesReducer,
    commentsReducer,
    notebooksReducer
});

export default rootReducer;
