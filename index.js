const fs = require("fs");
const http = require("http");
const url = require("url");

function replaceTemplate(temp, item) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, item.productName);
  output = output.replace(/{%IMAGE%}/g, item.image);
  output = output.replace(/{%PRICE%}/g, item.price);
  output = output.replace(/{%FROM%}/g, item.from);
  output = output.replace(/{%NUTRIENTS%}/g, item.nutrients);
  output = output.replace(/{%QUANTITY%}/g, item.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, item.description);
  output = output.replace(/{%ID%}/g, item.id);

  if (!item.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
}
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

  //HOME PAGE
  if ((pathURL === "/") | (pathURL === "/overview")) {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHTML = responseObj
      .map((item) => replaceTemplate(templateCard, item))
      .join("");

    console.log(cardsHTML);
    const output = templateOverview.replace("%PRODUCT_CARDS%", cardsHTML);
    res.end(output);
  }
  //PRODUCT PAGE
  else if (pathURL === "/product") {
    res.end("welcome to product page");
  }
  //API
  else if (pathURL === "/api") {
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
