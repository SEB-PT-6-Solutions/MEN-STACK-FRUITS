/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

// DB Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Models
const Fruit = require('./models/fruit');

// Middleware

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});

app.post('/fruits', async (req, res) => {
  console.log(req.body);
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);

  res.redirect('/fruits/new');
});

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
