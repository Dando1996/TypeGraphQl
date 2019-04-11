import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { GraphQLServer } from 'graphql-yoga';
import errorMiddleware from './Middleware/error.middleware';
import Mutation from './graphql/Products/ProductMutations';
import Query from './graphql/Products/ProductQuery';

interface serverOptions {
  port: number,
  endpoint: string,
  playground: string
}

class App {

  private resolvers = {
    Query,
    Mutation
  };
  public expressApp: any
  public mongoClient: MongoClient
  public server: GraphQLServer
  public options: serverOptions;

  constructor (port: number, middleWares?: any) {
    this.options = {
      port: port,
      endpoint: '/graphql',
      playground: '/playground'
    }
    this.server = new GraphQLServer(
      {
        typeDefs: './src/server/graphql/Products/schema.graphql',
        resolvers: this.resolvers
      })
  //  this.expressApp = this.server.express() //exposing the express App from the GraphQLServer
    //this.initializeMiddlewares(middleWares)
    //this.initializeErrorHandling()
    this.mongoConnection = this.initializeMongoConnection()
  }

  private initializeMiddlewares(middleWares?: any) {
    this.expressApp.use(bodyParser.json())
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
    this.server.start( this.options, () => {
      console.log(`Server is running on http://localhost: ${this.options.port}${this.options.endpoint}`)
    })
  }
}
export default App;
