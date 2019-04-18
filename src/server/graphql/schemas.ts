import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { readdirSync, lstatSync, existsSync } from "fs";
import * as path from "path";
import { importSchema } from 'graphql-import'
import { GraphQLSchema } from 'graphql';

const schemas: GraphQLSchema[] = [];

const isDirectory = dirPath =>  existsSync(dirPath) && lstatSync(dirPath).isDirectory();
const getDirectories = source =>
  readdirSync(source).map( name => path.join(source, name) ).filter(isDirectory)

const folders = getDirectories( path.resolve(__dirname, './') )

folders.forEach(folder => {
    folder = folder.substr( folder.lastIndexOf("\\")+1 )

    const {resolvers} = require(`./${folder}/${folder}Resolver`);
    const typeDefs = importSchema( path.join(__dirname, `./${folder}/schema.graphql`) );
    
    schemas.push(makeExecutableSchema({resolvers, typeDefs}))
});

const mergedSchemas = mergeSchemas({ schemas })

export default mergedSchemas;