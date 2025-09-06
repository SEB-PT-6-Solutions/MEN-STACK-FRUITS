/* eslint-disable prefer-destructuring */
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

app.get('/fruits', async (req, res) => {
  const fruits = await Fruit.find();

  res.render('fruits/index.ejs', { fruits });
});

app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs');
});

app.get('/fruits/:fruitId', async (req, res) => {
  const fruitId = req.params.fruitId;

  const fruit = await Fruit.findById(fruitId);
  res.render('fruits/show.ejs', { fruit });
});

app.post('/fruits', async (req, res) => {
  console.log(req.body);
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);

  res.redirect('/fruits');
});

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
