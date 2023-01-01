const { mongoose } = require('../dbConfig');

const reportSchema = new mongoose.Schema({
  date: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  adClicked: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Report', reportSchema);
