FROM node:14

WORKDIR /auth-service/
COPY ./package.json /auth-service/
COPY ./yarn.lock /auth-service
RUN yarn install

#RUN mkdir auth-service => auth-service가 없으면 COPY할 때 자동으로 만들어짐
COPY . /auth-service/
CMD yarn start:dev
