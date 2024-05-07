//using module.exports
const C = require("./test-module-1");
const calculator = new C();
console.log(C);
console.log(calculator.multiply(5, 5));

//using exports
const calculator2 = require("./test-module-2");
console.log(calculator2.multiply(5, 5));

const { add, divide, multiply } = require("./test-module-2");

console.log(multiply(3,3));

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')(); 