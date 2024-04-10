FROM node:21-alpine3.18

RUN mkdir -p /frontend

COPY /node_modules frontend/node_modules
COPY /public frontend/public
COPY src /frontend/src
COPY package.json /frontend

WORKDIR /frontend

ARG REACT_APP_PORT_BACKEND
ENV REACT_APP_PORT_BACKEND $REACT_APP_PORT_BACKEND

RUN npm install
CMD ["npm", "start"]

EXPOSE 3000
