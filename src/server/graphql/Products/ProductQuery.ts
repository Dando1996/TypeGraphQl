import productModel from './ProductModel';
import * as mongoose from 'mongoose';

const query = {
  info: () => `This is a hello world message from graphQL`,
  allProducts: async () => {
    return await productModel.find()
  },
  getProductById: async (parent, args) => {
    const id = args.id;
    console.log('get product by id: ' + id)
    if(mongoose.Types.ObjectId.isValid(id)) {
      return await productModel.findById(id)
    }
    else {
      console.err('Object id is not valid: ' + id);
      return null
    }
  }
};
export default query;
