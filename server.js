var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
var port = 5000 || process.env.PORT;
app.set('view engine','ejs');

app.use(express.static('./public'));

//fire controller
todoController(app);

app.listen(port);
console.log('listening');