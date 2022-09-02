// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

// The GraphQL schema
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn => 객체 1개를 의미
    fetchBoards: [MyReturn] # => 배열 안의 객체를 의미
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String => 입력 데이터를 낱개로 보냄
    createBoard(createBoardInput: CreateBoardInput!): String # => 입력 데이터를 묶어서 보냄(실무형)
    createTokenOfPhone(myPhone: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context /**ctx */, info) => {
      // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다",
          contents: "내용이에요",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희입니다",
          contents: "영희에요",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이입니다",
          contents: "훈이에요",
        },
      ];

      // 2. DB에서 거내온 결과를 브라우저에 응답(response) 주기
      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      //

      // 3. DB에 저장이 잘 됐으면 결과를 브라우저에 응답(response) 주기
      return "게시물 등록에 성공했습니다.";
    },

    createTokenOfPhone: (_, args) => {
      const myPhone = args.myPhone;
      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkPhone(myPhone);
      if (isValid === false) return;

      // 2. 핸드폰 토큰 6자리 만들기
      const myToken = getToken();

      // 3. 핸드폰번호에 토큰 전송하기
      sendTokenToSMS(myPhone, myToken);
      return "인증완료";
    },
  },
};

const app = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

app.listen(3000).then(() => {
  console.log("서버프로그램을 켜는데 성공했습니다");
});
