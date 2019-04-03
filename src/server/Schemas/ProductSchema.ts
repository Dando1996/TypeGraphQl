import * as mongoose from 'mongoose';

export interface IProducts {
  title: String,
  description: String,
  price: number,
  // sellerId: number,
  // reviewsId: number
};

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  // sellerId: Number,
  // reviewsId: Number
})

export default productSchema;

//TODO: fix this.product = false and this.product.find() not a function
//productMdel doesn't seem to be instantiated?
