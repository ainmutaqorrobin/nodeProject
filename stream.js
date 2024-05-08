const fs = require("fs");
const server = require("http").createServer();

server.on("reqest", (req, res) => {
  //   fs.readFile("./txt/output.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  const readable = fs.createReadStream("./txt/test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end(err);
  // });

  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`server is listening`);
});
