const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// setup express app
const app = express();

// public static content
app.use(express.static('public'));

//set up port for heroku or local
const port = process.env.PORT || 3000;

//bodyParser
//omitting the false urlencoded, since it's caused issues
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

//handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//connect routes
const routes = require(path.join(__dirname, './controllers/burgers_controller.js'));
app.use(routes);

//log the listener
app.listen(port);
