const { EventEmitter } = require("stream");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("its a new sale");
});
myEmitter.on("newSale", () => {
  console.log(`Customer name: Robins`);
});
myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left`);
});
myEmitter.emit("newSale", 10);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`request received`);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log(`this is another request`);
  res.end("another request");
});

server.on("close", () => {
  console.log(`server closed`);
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`waiting for request`);
});
