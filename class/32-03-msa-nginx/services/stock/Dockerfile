FROM node:14

WORKDIR /stock-service/
COPY ./package.json /stock-service/
COPY ./yarn.lock /stock-service
RUN yarn install

#RUN mkdir stock-service => stock-service가 없으면 COPY할 때 자동으로 만들어짐
COPY . /stock-service/
CMD yarn start:dev
