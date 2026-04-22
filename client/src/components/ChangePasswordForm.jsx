import React, { useState } from 'react';
import { sendPost } from '../helper';

const ChangePasswordForm = ({ setMessage, setError }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendPost('/changePassword', { oldPass, newPass, newPass2 });

    if (result.error) {
      setError(result.error);
      return;
    }

    setError('');
    setMessage(result.message);
    setOldPass('');
    setNewPass('');
    setNewPass2('');
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Change Password</h2>
      <input type="password" placeholder="Old Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
      <input type="password" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
      <input type="password" placeholder="Confirm New Password" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePasswordForm;
