import App from './App'
import 'dotenv/config';
import ProductController from './Controllers/ProductController';
import ProductSchema from './Schemas/ProductSchema';
import { GraphQLServer } from 'graphql-yoga';

const env = process.env.NODE_ENV;
console.log('env: ' + env)

const port = parseInt(process.env.SERVER_PORT) || 3001;
console.log('port: ' + port)

// const productController = new ProductController();
// const app = new App(port, undefined, [productController])
//
// app.listen(port)

//actual implementation of the GraphQl schema
//all fields have resolver functions
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.youtube.com',
  description: 'Full on procrastination'
}
]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (obj, args) => links.find( link => link.id === args.id )
  },
  Mutation: {
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      let link = links.find( link => link.id === args.id )
      link.description = args.description
      link.url = args.url
      return link
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex( link => link.id === args.id )
      console.log('index: ' + index)
      if( index != -1 ) {
        links.splice(index, 1);
        console.log('id count: ' + idCount)
        console.log(links)
      }
      else {
        console.error('index not found in links')
      }
      return null
    }
  },
}

const server = new GraphQLServer({ typeDefs: './src/server/Schemas/schema.graphql', resolvers })
server.start({port}, () => console.log(`Server is running on http://localhost: ${port}`))
