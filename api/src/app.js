const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const routes = require('./routes/index.js');
const router = require("./routes/index.js")
const {auth} = require("express-openid-connect")



require('./db.js');

const server = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'Yessssadfasdfasdf',
  baseURL: 'http://localhost:3001',
  clientID: '1ksbzn6eueLg1R2SG3upcXZjY9Sdm4GD',
  issuerBaseURL: 'https://dev-y4mdv7lm3spxjtu2.us.auth0.com'
};

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json());

server.use(auth(config));

server.use("/", router);
server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out' );
});


server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;