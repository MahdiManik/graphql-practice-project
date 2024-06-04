import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

const typeDefs = `#graphql
  
  type Post {
    id: ID!
    title: String!
    body: String!
  }

  type Query {
    posts: [Post]

  }
  
`;

const resolvers = {
  Query: {
    posts: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts")).data,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
