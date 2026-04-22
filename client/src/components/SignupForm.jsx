import React, { useState } from 'react';
import { sendPost } from '../helper';

const SignupForm = ({ setError }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendPost('/signup', { username, pass, pass2 });

    if (result.error) {
      setError(result.error);
      return;
    }

    window.location = result.redirect;
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={pass2} onChange={(e) => setPass2(e.target.value)} />
      <button type="submit">Create Account</button>
    </form>
  );
};

export default SignupForm;