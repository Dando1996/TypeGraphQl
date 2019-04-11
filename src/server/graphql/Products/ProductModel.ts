import * as mongoose from 'mongoose';
import productSchema, { IProducts } from './ProductSchema.ts';

const productModel = mongoose.model<IProducts & mongoose.Document>('Product', productSchema)
/*
  The first argument is the singular name of the collection your model is for.
  Mongoose automatically looks for the plural, lowercased version of your model name.
*/
export default productModel;
