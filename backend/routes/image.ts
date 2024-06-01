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
    const {name, receipt, ingredients} = req.body;

    const cocktailData = {
      user: req.user?._id,
      name: name,
      receipt: receipt,
      image: req.file ? req.file.filename : null,
      ingredients: JSON.parse(ingredients)
    };

    const cocktail = new Images(cocktailData);
    await cocktail.save();

    return res.send(cocktail);
  } catch (e) {
    if (req.file?.filename) deleteImage(req.file?.filename);
    if (e instanceof mongoose.Error.ValidationError) return res.status(422).send(e);
    next(e);
  }
});

imageRouter.get('/', auth, async (req: Auth, res, next) => {
  const {user} = req.query;

  try {
    if (req.user?.role === 'admin' && !user) {
      const allAlbums = await Images.find();
      return res.send(allAlbums);
    }

    if (typeof user === 'string') {
      const userCocktails = await Images.find({user});
      return res.send(userCocktails)
    }

    const publishedAlbums = await Images.find({isPublished: true});
    return res.send(publishedAlbums);
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