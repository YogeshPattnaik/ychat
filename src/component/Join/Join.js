import React, { useState } from 'react';
import './Join.css';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const sendUser = () => {
    if (name) {
      navigate('/chat', {
        state: name,
      });
    }
  };
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>yChat</h1>
        <input
          placeholder="Enter your name"
          type="text"
          id="joinInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="joinbtn" onClick={() => sendUser()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Join;
