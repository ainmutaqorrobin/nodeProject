const fs = require("fs");
const http = require("http");
const url = require("url");

const response = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const responseObj = JSON.parse(response);

//FILE
// // const fileread = fs.readFileSync("./txt/input.txt", "utf-8");
// // // console.log(fileread);

// // const textOut = "this is: replaced file. Created on " + Date.now();
// // fs.writeFileSync("./txt/output.txt", textOut);
// // // console.log(`file written`);

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/writefile.txt", `${data2}\n${data3}`, (err) => {
//         console.log(`created new file`);
//       });
//     });
//   });
// });

//SERVER
const server = http.createServer((req, res) => {
  const pathURL = req.url;
  if ((pathURL === "/") | (pathURL === "/overview")) {
    res.end("welcome to overview page");
  } else if (pathURL === "/product") {
    res.end("welcome to product page");
  } else if (pathURL === "/api") {
    res.writeHead(200, "request SUCCESSFUL", {
      "content-type": "application/json",
    });
    res.end(response);
  } else {
    res.writeHead(404, "Invalid page", {
      "Content-type": "text/html",
      "my-own-header": "hello-robin",
    });
    res.end("page not found");
  }
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`listening to request on port 8000`);
});
