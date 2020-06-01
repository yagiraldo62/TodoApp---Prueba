import resolvers from './resolvers';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = importSchema('Backend/data/GQLSchemas/schema/index.graphql');
export default makeExecutableSchema({ typeDefs, resolvers });
