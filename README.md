# web-final

## Quick Start

### Without docker

yarn install
cd frontend and yarn install
cd backend and yarn install

- install redis with

```js
sudo apt update
sudo apt install redis-server
```

- open a terminal and type to start redis server

```js
"redis-server";
```

- put MONGO_URL, gmail_adress, gmail_password into backend/.env
- yarn install
- open terminals and type

```js
yarn initialize
yarn api-server
yarn socket-server
yarn start
```

### With Docker

yarn install
cd frontend and yarn install
cd backend and yarn install

- put MONGO_URL, gmail_adress, gmail_password into backend/.env
- fix redis connection in api-server/server.js line 15
- pass {host:'redis'} to function

```js
yarn initialize
```

- docker-compose up -d

see app in localhost:3000
測試遊玩時，請點到"room"，並優先加入已經有 3 名玩家的 game，遊戲需要玩家人數達 4 人才能開始

## 每位組員之負責項目

- 崔翰清: frontend/Components/gameboard, frontend/constants, frontend/Containers/friends, frontend/Containers/homepage, backend/api-server/api, backend/api-server/initdata, backend/api-server/sendmail, backend/socket-server/server

- 蔡仲廷: frontend/app/store, frontend/Components/moveSelector, frontend/Containers/App.js, frontend/Containers, backend/api-server/api, backend/api-server/server, backend/models, backend/socket-server
