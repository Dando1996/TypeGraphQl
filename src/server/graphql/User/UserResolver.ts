import userModel from './UserModel';
import * as mongoose from 'mongoose';

const query = {
  allUsers: async () => {
    return await userModel.find()
  },
  getUserById: async (parent, args) => {
    const id = args.id;
    console.log('get user by id: ' + id)
    if(mongoose.Types.ObjectId.isValid(id)) {
      return await userModel.findById(id)
    }
    else {
      console.error('Object id is not valid: ' + id);
      return null
    }
  }
};

export const resolvers = {
  Query: query
}
