// Here is where we import modules
// We begin by loading Express
const express = require('express');
const morgan = require('morgan');

const PORT = 3000;
const app = express();
// Middleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
