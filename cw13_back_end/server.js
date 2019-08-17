const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const institutions = require('./app/institutions');
const ratings = require('./app/ratings');
const users = require('./app/users');
const images = require('./app/images');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8003;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
  app.use('/institutions', institutions);
  app.use('/ratings', ratings);
  app.use('/users', users);
  app.use('/images', images);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
});