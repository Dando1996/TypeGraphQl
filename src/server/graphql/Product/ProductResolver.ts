import productModel from './ProductModel';
import * as mongoose from 'mongoose';
import { IProducts } from './ProductSchema';

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
      console.error('Object id is not valid: ' + id);
      return null
    }
  }
};

const mutation = {
  createProduct: async (parent, args) => {
    console.log('create the product..');
    const productData: IProducts = {
      'title': args.title,
      'description': args.description,
      'price': args.price
    }
    const createdProduct = new productModel(productData);
    const error = await createdProduct.save()
    if (error) {
      console.log('error with saving: ' + error)
      return error;
    }
    return createdProduct;
  },
  modifyProduct: async (parent, args) => {
    const id = args.id;
    const productData: IProducts = { 'title': args.title, 'description': args.description, 'price': args.price };

    const result = await productModel.findOneAndUpdate(id, productData, { new: true })
    console.log('result: ' + result)
    return result
  },
  deleteProduct: async (parent, args) => {
    const id = args.id;
    return await productModel.findByIdAndDelete(id)
  }
};

export const resolvers = {
  Query: query,
  Mutation: mutation
}
