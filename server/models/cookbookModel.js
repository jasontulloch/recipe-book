import mongoose from 'mongoose';

const cookbookSchema = mongoose.Schema(
  {
    chef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Chef'
    },
    cookbook_name: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false
    },
    recipes: {
      type: Array,
      default: []
    },
    description: {
      type: String,
      required: false,
    },
    cookbook_cover_image: {
      type: String,
      required: false
    },
  }, {
    timestamps: true,
  }
)

const Cookbook = mongoose.model('Cookbook', cookbookSchema);

export default Cookbook;
