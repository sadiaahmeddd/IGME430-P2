import React, { useState } from 'react';
import { sendPost } from '../helper';

const LoginForm = ({ onLogin, setError }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendPost('/login', { username, pass });

    if (result.error) {
      setError(result.error);
      return;
    }

    window.location = result.redirect;
    onLogin();
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;