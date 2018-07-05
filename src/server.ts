import * as express from 'express';

import * as mongoose from "mongoose";


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL);

app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/'));

app.listen(port);

// routes ==================================================
import * as hero from "./api/hero";
hero.heroes(app);


app.get('*', function (req, res) {
  res.sendFile('index.html', { "root": __dirname }); // load our public/index.html file
});

console.log('Server running at ' + port);

exports = module.exports = app;                         
