import React, { useState, useRef } from 'react';
import CreateComponent from './ComponentFactoryHOC';
import { loginUser, logoutUser } from '../api/auth';

function Login() {
  const [loginToken, setLoginToken] = useState(sessionStorage.getItem('app-token') !== null);
  let username;
  let password;
  const usernameRef = useRef('');

  const handleLogin = async (e) => {
    const token = await loginUser(username, password);
    
    if (token) {
      localStorage.setItem('app-token', token);
      setLoginToken(true);
      console.log('login', token);
    } else {
      console.log('Error', 'authentication failure');
    }
  };

  const handleLogout = async () => {
    const status = await logoutUser(username, password);
    if (status === 200) {
      localStorage.removeItem('app-token');
      window.location.reload();
    } else {
      console.log('Error', 'logout failure');
    }
  };

  const handleUsernameChange = (e) => {
    username = e.target.value;
    usernameRef.current = e.target.value;
    console.log('value', username);
  };

  const handlePasswordChange = (e) => {
    password = e.target.value;
    console.log('value', password);
  };

  if (loginToken === false) {
    return (
      <div className="App">
        <label>
          Username:
          <CreateComponent type={'input'} eventHandler={handleUsernameChange} text={'username'} /> 
        </label>
        <label>
          Password:
          <CreateComponent type={'input'} eventHandler={handlePasswordChange} text={'password'} /> 
        </label>
        <CreateComponent type={'button'} eventHandler={handleLogin} text={'Login'} /> 
      </div>
    );
  }

  return (
    <div className="App">
      <label>
        Welcome -empty-|
        {username} |- the Ref- {usernameRef.current}
      </label>
      <CreateComponent type={'button'} eventHandler={handleLogout} text={'Logout'} /> 
    </div>
  );
}

export default Login;
