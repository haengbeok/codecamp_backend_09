FROM node:14

WORKDIR /resource-service/
COPY ./package.json /resource-service/
COPY ./yarn.lock /resource-service
RUN yarn install

#RUN mkdir resource-service => resource-service가 없으면 COPY할 때 자동으로 만들어짐
COPY . /resource-service/
CMD yarn start:dev
