const dev = require('./dev');
const prod = require('./prod');
let env;

if (process.env.NODE_ENV === 'production') {
  env = prod
} else {
  env = dev;
}

module.exports = env;
