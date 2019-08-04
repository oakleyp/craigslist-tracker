const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tracker = new Schema({
  tracker_name: {
    type: String,
  },
  root_url: {
    type: String,
  },
  search_text: {
    type: String,
  },
  min_price: {
    type: Number,
  },
  max_price: {
    type: Number,
  },
  notify_email: {
    type: String,
  },
  notify_every: {
    type: Number,
  },
  notify_unit: {
    type: String,
  },
  notify_interval: {
    type: Number,
  },
  last_notified: {
    type: Date,
  }
}, {
  collection: 'tracker',
});

module.exports = mongoose.model('Tracker', Tracker);