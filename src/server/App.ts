import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import Controller from './Controllers/types';
import errorMiddleware from './Middleware/error.middleware';
import ProductController from './Controllers/ProductController';

class App {
  public expressApp: any
  public port: number
  public mongoClient: MongoClient

  constructor (port: number, middleWares?: any, controllers?: Controller[]) {
    this.expressApp = express()
    this.initializeMiddlewares(middleWares)
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
    this.mountRoutes()
    this.port = port
    this.mongoConnection = this.initializeMongoConnection()
  }

  private mountRoutes (): void {
    const router = express.Router()

    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })

    router.post('/', (req, res) => {
      res.send(req.body)
    })

    this.expressApp.use('/api', router)
  }

  private initializeMiddlewares(middleWares?: any) {
    this.expressApp.use(bodyParser.json())
  }

  private initializeControllers(controllers?: Controllers[]) {
    if (controllers !== undefined || controllers.length != 0){
      controllers.forEach((controller) => {
        this.expressApp.use('/api', controller.router)
      });
    }
  }

  public initializeMongoConnection() {
    const {
      MONGO_USER,
      MONGO_PWD,
      MONGO_PATH,
      MONGO_DB
    } = process.env;
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_PATH}/${MONGO_DB}?retryWrites=true`;
    return mongoose.connect(uri, { useNewUrlParser: true });
    //our models will use the default connection as they are created by mongoose.model()
  }

  public initializeErrorHandling() {
    this.expressApp.use(errorMiddleware)
  }

  public listen(port?: number, err?: any) {
    if (err) {
      return console.log(err)
    }
    this.expressApp.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    });
  }
}
export default App;
