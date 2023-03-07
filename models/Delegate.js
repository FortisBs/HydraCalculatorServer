const { Schema, model } = require('mongoose');

const Delegate = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  shareRate: {
    type: Number,
    pattern: /^(0(\.\d{1,2})?|1(\.0{1,2})?)$|^([01](\.\d{1,2})?)$/,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { versionKey: false });

module.exports = model('Delegate', Delegate);
