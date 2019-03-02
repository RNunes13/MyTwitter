
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  node_env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || '3000',
};
