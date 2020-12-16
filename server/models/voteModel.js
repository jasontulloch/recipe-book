import mongoose from 'mongoose';

const voteSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    rating: { type: Number, required: true},
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Chef'
    }
  }, {
    timestamps: true,
  }
);

export default voteSchema;
