import App from './App'
import 'dotenv/config';
import ProductSchema from './graphql/Products/ProductSchema';

const env = process.env.NODE_ENV;
console.log('env: ' + env)

const port = parseInt(process.env.SERVER_PORT) || 3001;
console.log('port: ' + port)

const app = new App(port, undefined)

app.listen(port)
