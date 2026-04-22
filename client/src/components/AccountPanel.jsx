import React from 'react';
import { sendPost } from '../helper';

const AccountPanel = ({ account, refreshAccount, setMessage }) => {
  const handlePremium = async () => {
    const result = await sendPost('/togglePremium', {});
    setMessage(result.message);
    refreshAccount();
  };

  return (
    <div className="card">
      <h2>Account</h2>
      <p><strong>User:</strong> {account.username}</p>
      <p><strong>Premium:</strong> {account.premium ? 'Yes' : 'No'}</p>
      <button type="button" onClick={handlePremium}>
        {account.premium ? 'Turn Off Premium' : 'Try Premium'}
      </button>
      <a className="button-link" href="/logout">Logout</a>
    </div>
  );
};

export default AccountPanel;