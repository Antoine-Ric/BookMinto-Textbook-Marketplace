import React from 'react';

const Notification = ({message, type}) => {
    return (
        <div className={'notifcation ${type}'}>
            <p>{message}</p>
        </div>
    );
};

export default Notification; 