import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

class App {
  public expressApp: any
  public port: number
  public mongoClient: MongoClient

  constructor (port: number, middleWares?: any) {
    this.expressApp = express()
    this.initializeMiddlewares(middleWares)
    this.mountRoutes()
    this.port = port
    this.mongoClient = this.initializeMongoClient()
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

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.expressApp.use('/', controller.router)
    });
  }

  public initializeMongoClient() {
    const {
      MONGO_USER,
      MONGO_PWD,
      MONGO_PATH,
      MP_LAB_CLUSTER
    } = process.env;
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_PATH}/test?retryWrites=true`;
    return new MongoClient(uri, { useNewUrlParser: true });
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
