// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    fetchBoards: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      return "gql 첫 연습";
    },
  },

  //   Mutation: {
  //     createQqq: () => {

  //     }
  //   }
  //
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

app.listen(3000).then(() => {
  console.log("서버프로그램을 켜는데 성공했습니다");
});
