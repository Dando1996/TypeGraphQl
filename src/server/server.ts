import App from './App'
import 'dotenv/config';

const assert = require('assert');

const env = process.env.NODE_ENV;
console.log('env: ' + env)

const port = parseInt(process.env.SERVER_PORT) || 3001;
console.log('port: ' + port)

const app = new App(port)
app.mongoClient.connect(err => {
  assert.equal(null, err);
  console.log('successfully connected to db');
  const collection = app.mongoClient.db("BlackMarket").collection("Items");
  // perform actions on the collection object
  app.mongoClient.close();
});

app.listen(port)
