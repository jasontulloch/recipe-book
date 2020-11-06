import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: true
    },
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Chef'
    }
  }, {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
