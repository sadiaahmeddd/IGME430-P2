import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getJSON } from './helper';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChangePasswordForm from './components/ChangePasswordForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AccountPanel from './components/AccountPanel';
import FilterBar from './components/FilterBar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(window.location.pathname === '/app');
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const refreshAccount = async () => {
    const data = await getJSON('/getAccount');
    setAccount(data);
  };

  const loadTasks = async () => {
    const data = await getJSON('/getTasks');
    setTasks(data.tasks);
  };

  useEffect(() => {
    if (loggedIn) {
      refreshAccount();
      loadTasks();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <main className="center-card">
        <div className="hero">
          <h1>StudySpace</h1>
          <p>A simple private study planner with a premium demo feature.</p>
        </div>

        {error ? <p className="error-message">{error}</p> : null}

        <div className="auth-grid">
          <LoginForm onLogin={() => setLoggedIn(true)} setError={setError} />
          <SignupForm setError={setError} />
        </div>
      </main>
    );
  }

  if (!account) {
    return <main className="center-card"><p>Loading...</p></main>;
  }
  let visibleTasks = tasks;

  if (filter === 'Open') {
    visibleTasks = tasks.filter((task) => !task.completed);
  }

  if (filter === 'Completed') {
    visibleTasks = tasks.filter((task) => task.completed);
  }

  return (
    <main className="app-layout">
      <header className="top-bar">
        <div>
          <h1>StudySpace</h1>
          <p>Keep track of your study tasks in one place.</p>
        </div>
      </header>

      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}

      <section className="dashboard-grid">
        <AccountPanel account={account} refreshAccount={refreshAccount} setMessage={setMessage} />
        <ChangePasswordForm setMessage={setMessage} setError={setError} />
        <TaskForm premium={account.premium} loadTasks={loadTasks} setError={setError} />
        <FilterBar filter={filter} setFilter={setFilter} />
      </section>
      <section>
        <TaskList tasks={visibleTasks} loadTasks={loadTasks} premium={account.premium} />
      </section>
    </main>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);