const { error } = require("console");
const fs = require("fs");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");
// fs.readFile(`${__dirname}/txt/dog.txt`, (err, data) => {});

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`There's error occured`);
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject(`Could not write the file`);
      resolve(`Write success from promise`);
    });
  });
};

readFilePromise(`${__dirname}/txt/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);
    return superagent.get(`https:/dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log(`random image saved to file`);
  })
  .catch((err) => {
    console.log(err.message);
  });
