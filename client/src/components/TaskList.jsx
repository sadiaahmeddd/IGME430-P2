import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loadTasks, premium }) => {
  if (tasks.length === 0) {
    return (
      <div className="card">
        <h2>Your Tasks</h2>
        <p>No tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Your Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} loadTasks={loadTasks} premium={premium} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;