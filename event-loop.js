const fs = require("fs");
const cryp = require("crypto");
const { clear } = require("console");
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log(`Timer 1 finished`), 0);
setImmediate(() => console.log(`immediate 1 finished`));

fs.readFile("./txt/test-file.txt", () => {
  console.log("I/O Finished");
  console.log(`================`);
  setTimeout(() => console.log(`Timer 2 finished`), 0);
  setTimeout(() => console.log(`Timer 3 finished`), 3000);
  setImmediate(() => console.log(`immediate 2 finished`));

  process.nextTick(() => console.log(`next tick executed`));
  cryp.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " seconds password created");
  });
  cryp.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " seconds password created");
  });
  cryp.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " seconds password created");
  });
  cryp.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " seconds password created");
  });
});

console.log(`hello from top level code`);
