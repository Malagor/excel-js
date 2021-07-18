import "core-js/stable";
import "regenerator-runtime/runtime";
import "./scss/index.scss";

const log = (message) => {
  console.log(message);
};

log("It`s works!!###");

async function start() {
  return Promise.resolve("promise 222");
}

start().then(console.log);
