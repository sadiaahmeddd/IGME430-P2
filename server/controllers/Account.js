const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('app');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = async (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const account = await Account.authenticate(username, pass);

    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/app' });
  } catch (err) {
    return res.status(401).json({ error: 'Wrong username or password.' });
  }
};

const signup = async (req, res) => {
    const { username, pass, pass2 } = req.body;
  
    if (!username || !pass || !pass2) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    if (pass !== pass2) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
  
    try {
      const hash = await Account.generateHash(pass);
      const newAccount = new Account({
        username,
        password: hash,
      });
  
      await newAccount.save();
  
      req.session.account = Account.toAPI(newAccount);
      return res.status(201).json({ redirect: '/app' });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }
  
      return res.status(500).json({ error: 'An error occurred creating account.' });
    }
  };

  const changePassword = async (req, res) => {
    const { oldPass, newPass, newPass2 } = req.body;
  
    if (!oldPass || !newPass || !newPass2) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    if (newPass !== newPass2) {
      return res.status(400).json({ error: 'New passwords do not match.' });
    }
  
    try {
      const account = await Account.authenticate(req.session.account.username, oldPass);
      const hash = await Account.generateHash(newPass);
  
      account.password = hash;
      await account.save();
  
      return res.json({ message: 'Password updated successfully.' });
    } catch (err) {
      return res.status(401).json({ error: 'Old password is incorrect.' });
    }
  };

  const getAccount = async (req, res) => {
    try {
      const account = await Account.findById(req.session.account._id).lean().exec();
  
      return res.json({
        username: account.username,
        premium: account.premium,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Could not load account.' });
    }
  };
  
  const togglePremium = async (req, res) => {
    try {
      const account = await Account.findById(req.session.account._id).exec();
      account.premium = !account.premium;
      await account.save();
  
      req.session.account.premium = account.premium;
  
      return res.json({
        premium: account.premium,
        message: account.premium ? 'Premium mode enabled.' : 'Premium mode disabled.',
      });
    } catch (err) {
      return res.status(500).json({ error: 'Could not update premium mode.' });
    }
  };
  
  module.exports = {
    loginPage,
    logout,
    login,
  signup,
  changePassword,
  getAccount,
  togglePremium,
};