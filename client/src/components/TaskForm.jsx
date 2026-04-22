import React, { useState } from 'react';
import { sendPost } from '../helper';

//create new tasks

const TaskForm = ({ premium, loadTasks, setError }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Only used if premium
  const [priority, setPriority] = useState('Medium');
  const [notes, setNotes] = useState('');

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendPost('/makeTask', {
      title,
      subject,
      dueDate,
      priority,
      notes,
    });
   

    // Show error if something went wrong
    if (result.error) {
      setError(result.error);
      return;
    }
    
    // Reset form
    setTitle('');
    setSubject('');
    setDueDate('');
    setPriority('Medium');
    setNotes('');
    setError('');

    // Reload tasks after adding
    loadTasks();
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
   

    // Only visible if premium 


      {premium ? (
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      ) : null}

      {premium ? (
        <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      ) : null}

      <button type="submit">Save Task</button>
    </form>
     );
    };
    
    export default TaskForm;