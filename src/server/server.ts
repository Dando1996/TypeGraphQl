import App from './App'
import 'dotenv/config';
import ProductController from './Controllers/ProductController';
import ProductSchema from './Schemas/ProductSchema';
const assert = require('assert');

const env = process.env.NODE_ENV;
console.log('env: ' + env)

const port = parseInt(process.env.SERVER_PORT) || 3001;
console.log('port: ' + port)

const productController = new ProductController();
const app = new App(port, undefined, [productController])

app.listen(port)
