import {Model} from 'mongoose';
import {ObjectId} from 'mongodb';

export interface ImageFromDB {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  image: string;
}

export type ImageWithoutId = Omit<ImageFromDB, '_id'>;

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string,
  googleID?: string
  image?: string
}

export interface UserFromDb extends UserFields {
  _id: ObjectId
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;