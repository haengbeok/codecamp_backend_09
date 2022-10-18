FROM node:14

WORKDIR /api-gateway/
COPY ./package.json /api-gateway/
COPY ./yarn.lock /api-gateway
RUN yarn install

#RUN mkdir api-gateway => api-gateway가 없으면 COPY할 때 자동으로 만들어짐
COPY . /api-gateway/
CMD yarn start:dev
