// Core node + express setup

const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');

// const RedisStore = require('connect-redis').default;
const { RedisStore } = require('connect-redis');


const { createClient } = require('redis');

// Handlebars for static pages
const exphbs = require('express-handlebars');
// Router file
const router = require('./server/router.js');

// Port setup
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/studyspace';
const redisURL = process.env.REDISCLOUD_URL || 'redis://127.0.0.1:6379';

const app = express();

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(dbURI);

const redisClient = createClient({
  url: redisURL,
});


// Create Redis client
redisClient.connect().catch((err) => {
    console.error('Redis connection error:', err);
  });
  
  // Set up Handlebars
  app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(__dirname, 'views'));
  

 // middleware setup
  app.disable('x-powered-by');
  app.use('/assets', express.static(path.resolve(__dirname, 'hosted')));
  app.use('/bundle', express.static(path.resolve(__dirname, 'client/bundle')));

  // app.use(favicon(path.resolve(__dirname, 'hosted/img/favicon.ico')));

  app.use(compression());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  // Session setup
  app.use(session({
    key: 'sessionid',
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    },
  }));

  // Use router

  router(app);

  // Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});