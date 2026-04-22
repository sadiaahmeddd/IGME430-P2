import React from 'react';
import { sendPost } from '../helper';

const TaskItem = ({ task, loadTasks, premium }) => {
  const toggleComplete = async () => {
    await sendPost('/updateTask', {
      taskId: task._id,
      completed: !task.completed,
    });

    loadTasks();
  };

  const removeTask = async () => {
    await sendPost('/deleteTask', { taskId: task._id });
    loadTasks();
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        <p><strong>Subject:</strong> {task.subject}</p>
        <p><strong>Due:</strong> {task.dueDate}</p>
        {premium ? <p><strong>Priority:</strong> {task.priority}</p> : null}
        {premium && task.notes ? <p><strong>Notes:</strong> {task.notes}</p> : null}
      </div>
      <div className="task-actions">
      <button type="button" onClick={toggleComplete}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button type="button" onClick={removeTask}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;