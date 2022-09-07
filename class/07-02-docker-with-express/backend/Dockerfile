FROM node:14

#RUN mkdir myfolder => myfolder가 없으면 COPY할 때 자동으로 만들어짐
COPY . /myfolder/
WORKDIR /myfolder/

RUN yarn install
CMD yarn start:dev
