const { mongoose } = require('../dbConfig');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Number,
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    required: true
  },
  infoURL: {
    type: String,
    required: true
  },
  downloadURL: {
    type: String,
    required: true
  },
  directDownloadURL: {
    type: String,
    required: true
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

module.exports = mongoose.model('File', fileSchema);
