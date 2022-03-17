import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import InputEmoji from 'react-input-emoji';
import './Chat.css';
import sendButton from '../../images/sendButton.png';
import Message from '../Message/Message';

const ENDPOINT = 'https://ychat-back.herokuapp.com/';
let socket;

const Chat = () => {
  const { state } = useLocation();
  const [id, setId] = useState('');
  const [inputMessage, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (inputMessage) {
      socket.emit('message', { message: inputMessage, id });
      setInput('');
    }
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      setId(socket.id);
    });
    socket.emit('joined', { user: state });

    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      //   console.log(user, message);
    });

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      //   console.log(user, message);
    });

    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      //   console.log(user, message);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      console.log(data);
      setMessages([...messages, data]);
      //   console.log(user, message);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>yChat</h2>
          <a href="/">
            <i class="fas fa-times-circle" aria-hidden="true"></i>
          </a>
        </div>

        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              message={item.message}
              side={item.id === id ? 'right' : 'left'}
              user={item.id === id ? '' : item.user}
            />
          ))}
        </ReactScrollToBottom>

        <div className="inputBox">
          <InputEmoji
            onEnter={sendMessage}
            value={inputMessage}
            onChange={setInput}
            type="text"
          />
          <button className="sendbtn" onClick={() => sendMessage()}>
            <img src={sendButton} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
