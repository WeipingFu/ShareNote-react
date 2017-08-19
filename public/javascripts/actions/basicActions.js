/**
 * Created by fuweiping on 2017/6/30.
 */
import { SENDING_REQUEST, SET_ERROR_MESSAGE, SET_SUCCESS_MESSAGE } from '../constants/appConstants';
import { message } from 'antd';
export function setErrorMessages(errorMessage) {
    message.error(errorMessage);
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage
    };
}

export function sendingRequest(isSending) {
    if(isSending) message.loading('正在发送请求', 0.5);
    return {
        type: SENDING_REQUEST,
        isSending
    };
}

export function setSuccessMessages(successMessage) {
    message.success(successMessage);
    return {
        type: SET_SUCCESS_MESSAGE,
        successMessage
    };
}
