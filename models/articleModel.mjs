import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article;
