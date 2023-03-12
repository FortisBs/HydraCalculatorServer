const { Schema, model } = require('mongoose');

const Delegate = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  shareRate: {
    type: Number,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });

module.exports = model('Delegate', Delegate);
