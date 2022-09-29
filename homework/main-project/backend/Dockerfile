FROM node:14

WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder
RUN yarn install

#RUN mkdir myfolder => myfolder가 없으면 COPY할 때 자동으로 만들어짐
COPY . /myfolder/
CMD yarn start:dev
