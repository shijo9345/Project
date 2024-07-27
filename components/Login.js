import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setLoginMessage('Login successful');

      window.location.href = '/booklist';
    } catch (error) {
      console.error('Error logging in user:', error);
      setLoginMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {loginMessage && <p className="login-message">{loginMessage}</p>}
    </div>
  );
};

export default Login;
