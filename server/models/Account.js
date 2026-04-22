const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.statics.toAPI = (doc) => ({
  username: doc.username,
  premium: doc.premium,
  _id: doc._id,
});

AccountSchema.statics.generateHash = async (password) => bcrypt.hash(password, 10);

AccountSchema.statics.authenticate = async (username, password) => {
  const doc = await mongoose.models.Account.findOne({ username }).exec();

  if (!doc) {
    throw new Error('Wrong username or password');
  }

  const match = await bcrypt.compare(password, doc.password);

  if (!match) {
    throw new Error('Wrong username or password');
  }

  return doc;
};

module.exports = mongoose.model('Account', AccountSchema);