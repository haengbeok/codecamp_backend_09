import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    fetchBoards: String
  }

  type Mutation {
    createBoard: String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: () => {
      // 데이터베이스에서 데이터를 꺼내오는 로직

      return "조회 성공";
    },
  },

  Mutation: {
    createBoard: () => {
      // 데이터베이스에 데이터를 등록하는 로직

      return "등록 성공";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
