const models = require('../models');

const { Task, Account } = models;

const makeTask = async (req, res) => {
  const {
    title, subject, dueDate, priority, notes,
  } = req.body;

  if (!title || !subject || !dueDate) {
    return res.status(400).json({ error: 'Title, subject, and due date are required.' });
  }

  try {
    const account = await Account.findById(req.session.account._id).lean().exec();

    const taskData = {
      title,
      subject,
      dueDate,
      owner: req.session.account._id,
      priority: account.premium ? (priority || 'Medium') : 'Medium',
      notes: account.premium ? (notes || '') : '',
    };

    const newTask = new Task(taskData);
    await newTask.save();

    return res.status(201).json({ task: Task.toAPI(newTask) });
  } catch (err) {
    return res.status(500).json({ error: 'Could not create task.' });
  }
};

const getTasks = async (req, res) => {
  try {
    const docs = await Task.find({ owner: req.session.account._id }).sort({ createdDate: -1 }).lean().exec();
    return res.json({ tasks: docs.map((doc) => Task.toAPI(doc)) });
  } catch (err) {
    return res.status(500).json({ error: 'Could not fetch tasks.' });
  }
};

const updateTask = async (req, res) => {
  const { taskId, completed } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required.' });
  }

  try {
    const task = await Task.findOne({ _id: taskId, owner: req.session.account._id }).exec();

    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      task.completed = completed === true || completed === 'true';
      await task.save();
  
      return res.json({ task: Task.toAPI(task) });
    } catch (err) {
      return res.status(500).json({ error: 'Could not update task.' });
    }
  };
  
  const deleteTask = async (req, res) => {
    const { taskId } = req.body;
  
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required.' });
    }
  
    try {
      const task = await Task.findOneAndDelete({ _id: taskId, owner: req.session.account._id }).exec();
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }

      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: 'Could not delete task.' });
    }
  };
  
  module.exports = {
    makeTask,
    getTasks,
    updateTask,
    deleteTask,
  };

