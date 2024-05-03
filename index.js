const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require('slugify')

const response = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
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

  //using ES6 destructuring
  const { query, pathname } = url.parse(pathURL, true);

  //HOME PAGE
  if ((pathname === "/") | (pathname === "/overview")) {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHTML = responseObj
      .map((item) => replaceTemplate(templateCard, item))
      .join("");

    const output = templateOverview.replace("%PRODUCT_CARDS%", cardsHTML);
    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = responseObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  }
  //APIs
  else if (pathname === "/api") {
    res.writeHead(200, "request SUCCESSFUL", {
      "content-type": "application/json",
    });
    res.end(response);
  }
  //INVALID REQUEST
  else {
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
