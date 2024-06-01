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

    if (title === '' || title[0] === ' ') {
      return res.status(400).send({error: 'Title is required for image creation and can not begin from whitespace.'});
    }
    if (!req.file) return res.status(400).send({error: 'Image is required.'});

    const imageData = {
      user: req.user?._id,
      title,
      image: req.file.filename
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

    const allImages = await Images.find().populate('user');
    return res.send(allImages);
  } catch (e) {
    next(e);
  }
});

imageRouter.get('/:_id', auth, async (req: Auth, res, next) => {
  try {
    const {_id} = req.params;
    const targetCocktail = await Images.findById({_id});
    return res.send(targetCocktail);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) return res.status(404).send({error: 'No such album'});
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
      return res.status(404).send({error: 'Images id is not an ObjectId.'});
    }

    const targetCocktail = await Images.findById(_id);
    if (!targetCocktail) return res.status(400).send({error: 'There is no cocktail to delete'});

    await Images.deleteOne(_id);

    return res.send({success: 'Images has been deleted.'});
  } catch (e) {
    next(e);
  }
});

export default imageRouter;