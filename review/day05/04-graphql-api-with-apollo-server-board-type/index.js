import { ApolloServer, gql } from "apollo-server";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

// The GraphQL schema
const typeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [BoardReturn]
  }

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput): String
  }

  type Mutation {
    createTokenOfPhone(phone: String!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: () => {
      // 데이터베이스에서 데이터를 꺼내오는 로직
      // return "조회 성공";

      return [
        { number: 1, writer: "철수", title: "제목입니다~~~", contents: "내용이에요!!!" },
        { number: 2, writer: "영희", title: "좋은 날씨입니다!", contents: "내용@@@@@" },
        { number: 3, writer: "훈이", title: "점심 맛있게 드셨나요?!", contents: "식사 하셨나요?!" },
        { number: 4, writer: "맹구", title: "안녕하세요?!", contents: "내용이요!!!" },
      ];
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 데이터베이스에 데이터를 등록하는 로직

      console.log("입력값들: ", args);
      console.log("입력값들2: ", args.createBoardInput);

      return "등록 성공";
    },
  },

  Mutation: {
    createTokenOfPhone: (_, args) => {
      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkPhone(args.phone);

      if (isValid === true) {
        // 2. 핸드폰 토큰 6자리 만들기
        const token = getToken(6);

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(args.phone, token);
      }

      return "인증번호를 전송했습니다.";
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
