import React from 'react';

const Notification = ((props) => {
    return (
        <div className={`notification notification--${props.type}`}>
            {props.message}
        </div>
    );
});

export default Notification;
