//packages
const express = require('express');
const path = require('path');

//establish express
const app = express();
//heroku hosting or local for now
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use(require(path.join(__dirname, '/app/routing/htmlRoutes.js')));
app.use(require(path.join(__dirname, '/app/routing/apiRoutes.js')));


//port listener
app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
