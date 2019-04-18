import * as mongoose from 'mongoose';
import ProductSchema, { IProducts } from '../Product/ProductSchema';

export interface IUser {
  uName: String,
  age: number,
  basket: [IProducts],
};

const userSchema = new mongoose.Schema({
  uName: String,
  age: Number,
  basket: [ProductSchema],
})


export default userSchema;
