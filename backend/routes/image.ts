import express from 'express';
import {deleteImage, imagesUpload} from '../multer';
import Images from '../models/Images';
import mongoose from 'mongoose';
import auth, {Auth} from '../middleware/auth';
import permit from '../middleware/permit';
import {ObjectId} from 'mongodb';

const imageRouter = express.Router();

imageRouter.post('/', auth, imagesUpload.single('image'), async (req: Auth, res, next) => {
  try {
    const {title} = req.body;

    if (title[0] === ' ') {
      if (req.file?.filename) deleteImage(req.file?.filename);
      return res.status(400).send({error: 'Title can not begin from whitespace.'});
    }

    const imageData = {
      user: req.user?._id,
      title,
      image: req.file ? req.file.filename : null
    };

    const image = new Images(imageData);
    await image.save();

    return res.send(image);
  } catch (e) {
    if (req.file?.filename) deleteImage(req.file?.filename);
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

imageRouter.get('/', async (req: Auth, res, next) => {
  const {user} = req.query;

  try {
    if (typeof user === 'string') {
      const userImages = await Images.find({user});
      return res.send(userImages);
    }

    const allImages = await Images.find().populate('user', '_id displayName');
    return res.send(allImages);
  } catch (e) {
    next(e);
  }
});

imageRouter.delete('/:id', auth, permit(['admin']), async (req: Auth, res, next) => {
  try {
    const {id} = req.params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return res.status(404).send({error: 'Image id is not an ObjectId.'});
    }

    const targetImage = await Images.findById(_id);
    if (!targetImage) return res.status(400).send({error: 'There is no image to delete'});

    await Images.deleteOne(_id);
    deleteImage(targetImage.image);

    return res.send({success: 'Image has been deleted.'});
  } catch (e) {
    next(e);
  }
});

export default imageRouter;