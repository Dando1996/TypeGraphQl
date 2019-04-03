import { controller } from 'types.ts';
import productModel from '../Models/ProductModel';
import { IProducts } from '../Schema/ProductSchema';
import ProductNotFoundException from '../Exceptions/ProductNotFoundException';
import HttpException from '../Exceptions/HttpException';
import * as express from 'express';
import * as mongoose from 'mongoose';

class ProductController implements controller {
  public path = '/products';

  constructor(){
    this.router = express.Router();
    this.productModel = productModel;
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.get(this.path, this.getAllProduct);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.put(`${this.path}/:id`, this.modifyProduct);
    this.router.delete(`${this.path}/:id`, this.deleteProduct);
    this.router.post(this.path, this.createProduct);
  }

  createProduct = (request: express.Request, response: express.Response) => {
    //const productData: IProducts = request.body;
    const productData: IProducts = {
      'title': 'Running shoes',
      'description': 'Old sweaty shoes',
      'price': 25
    }
    const createdProduct = new productModel(productData);
    createdProduct.save().then(product => {  response.send(product) })
  }

  getAllProduct = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    this.productModel.find().then(allData =>
      {
        if(allData && Object.keys(allData).length !== 0) {
          console.log('all data: ' + JSON.stringify(allData))
          response.send(allData)
        }
        else {
          next(new HttpException(404, 'Product not found'));
        }
      });
  }

  getProductById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    console.log('get product by id')
    if(mongoose.Types.ObjectId.isValid(id)) {
      this.productModel.findById(id).then(data => {
        if(data)
          response.send(data)
        else
          next(new ProductNotFoundException(id));
      }).catch(err => {console.error(err)});
    }
    else {
      next(new HttpException(500, 'Id is not a valid object ID'));
    }
  }

  modifyProduct = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const productData: Post = request.body;
    console.log('modifying product with id: ' + id)
    console.log('new product data.. ' + JSON.stringify(productData))
    this.productModel.findOneAndUpdate(id, productData, { new: true })
      .then((product) => {
        if(product)
          response.send(product);
        else
          next(new ProductNotFoundException(id));
      });
  }

  deleteProduct = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.productModel.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.send(200);
        } else {
          next(new ProductNotFoundException(id));
        }
      });
  }
}

export default ProductController;
