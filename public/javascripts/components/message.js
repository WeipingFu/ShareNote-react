/**
 * Created by fuweiping on 2017/7/11.
 */

import React from 'react';
import { message } from 'antd';

const success = (msg) => {
    message.success(msg);
};

const error = (msg) => {
    message.error(msg);
};

const Message = (props) => {
    if(props.errorMessage) {
        return(
            <div>{error(props.errorMessage)}</div>
        );
    } else if(props.successMessage) {
        return(
            <div>{success(props.successMessage)}</div>
        );
    }
    return(
        <span></span>
    );
};

export default Message;