const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {type: String, default: '' },
  author: { type: String, default: 'unknown' },
  subject: { type: String, default: '' },
  article: { type: String, default: '' }
});

module.exports = mongoose.model('Blog', BlogSchema);