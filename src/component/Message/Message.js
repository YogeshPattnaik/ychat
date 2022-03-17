import React from 'react';
import './Message.css';

const Message = ({ user, message, side }) => {
  if (user) {
    return (
      <div className={`messageBox ${side}`}>
        <b>{user}</b>: {message}
      </div>
    );
  } else {
    return <div className={`messageBox ${side}`}>{`${message}`}</div>;
  }
};

export default Message;
