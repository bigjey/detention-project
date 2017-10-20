const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 1212;

mongoose.connect('mongodb://admin:admin@ds113455.mlab.com:13455/detention-db', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./api');

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`open fucking http://localhost:${PORT}`);
})