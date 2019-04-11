import { IProducts } from './ProductSchema';
import productModel from './ProductModel';

const productMutations = {
  createProduct: async (parent, args) => {
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
    return createProduct;
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

export default productMutations;
