const fs = require("fs");

const fileread = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(fileread);

const textOut = "this is: replaced file. Created on " + Date.now();
fs.writeFileSync("./txt/output.txt", textOut);
console.log(`file written`);
