const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');

const trackerRoute = require('./routes/tracker.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('database is connected'); },
  err => { console.log(`could not connect to database: ${err}`) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('/tracker', cors());
app.use('/tracker', trackerRoute);
let port = process.env.PORT || 4000;

const server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});