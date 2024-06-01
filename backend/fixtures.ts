import mongoose from 'mongoose';
import config from './config';
import Images from './models/Images';
import Users from './models/Users';

const dropCollections = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const collections = ['users', 'images'];

const resetDB = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) await dropCollections(db, collection);

  const [user1, user2] = await Users.create(
    {
      email: 'user@gmail.com',
      password: 'user',
      token: crypto.randomUUID(),
      role: 'user',
      image: null,
      googleID: null,
      displayName: 'user'
    },
    {
      email: 'admin@gmail.com',
      password: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
      image: null,
      googleID: null,
      displayName: 'admin'
    },
  )

  await Images.create(
    {
      title: 'Bridge',
      image: 'fixtureImages/bridge.jpeg',
      user: user1
    },
    {
      title: 'Field',
      image: 'fixtureImages/field.jpeg',
      user: user1
    },
    {
      title: 'Lakeside',
      image: 'fixtureImages/lakeside.jpeg',
      user: user1
    },
    {
      title: 'Landscape',
      image: 'fixtureImages/landscape.jpeg',
      user: user2
    },
    {
      title: 'Sunshine',
      image: 'fixtureImages/sunShine.jpeg',
      user: user2
    },
    {
      title: 'Tree',
      image: 'fixtureImages/tree.jpeg',
      user: user2
    }
  );

  await db.close();
};

void resetDB();