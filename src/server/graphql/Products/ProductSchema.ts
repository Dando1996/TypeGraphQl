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
