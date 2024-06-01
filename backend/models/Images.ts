import {Schema, model, Types} from 'mongoose';
import Users from './Users';

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => Users.findById(id),
      message: 'Users does not exist!'
    }
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },

}, {versionKey: false});

const Images = model('Images', ImageSchema);

export default Images;