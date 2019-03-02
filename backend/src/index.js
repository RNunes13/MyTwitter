
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); 

// Configs
const {
  port,
  db: {
    user,
    password,
    database,
  }
} = require('./configs/environments.config');

mongoose.connect(
  `mongodb://${ user }:${ password }@ds037498.mlab.com:37498/${ database }`,
  {
    useNewUrlParser: true
  },
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => {
  console.log(`[server] app listening on port ${ port }!`)
});
