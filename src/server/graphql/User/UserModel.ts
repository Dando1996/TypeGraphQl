import * as mongoose from 'mongoose';
import UserSchema, { IUser } from './UserSchema';

const userModel = mongoose.model<IUser & mongoose.Document>('User', UserSchema)
/*
  The first argument is the singular name of the collection your model is for.
  Mongoose automatically looks for the plural, lowercased version of your model name.
*/
export default userModel;
