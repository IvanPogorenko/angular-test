// @ts-ignore
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router('data/films.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(3003, () => {
  console.log('working on port 3003');
});
