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
}, {
  collection: 'tracker',
});

module.exports = mongoose.model('Tracker', Tracker);