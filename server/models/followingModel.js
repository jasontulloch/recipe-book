import mongoose from 'mongoose';

const followingSchema = mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Chef'
    }
  }, {
    timestamps: true,
  }
);

export default followingSchema;
