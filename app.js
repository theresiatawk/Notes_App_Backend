const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ValidationError } = require("express-validation");

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const categoryRoutes = require('./routes/category');
const tagRoutes = require("./routes/tag");

const app = express();

app.use(bodyParser.json()); 

// Allowing access from different ports. 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Registering the routes
app.use('/auth', authRoutes);
app.use('/user', noteRoutes);
app.use('/admin', categoryRoutes);
app.use('/admin', tagRoutes);

//Error handler middleware
app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send(error);
  } else {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).send({ message: message, data: data });
  }
});


// Connecting to the server
mongoose
  .connect(process.env.DATABASE_URL)
  .then(result => {
    app.listen(process.env.PORT);
    console.log("Database Connected and running");
  })
  .catch(err => console.log(err));