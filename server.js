var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
var port = process.env.PORT || 5000;
app.set('view engine','ejs');

app.use(express.static('./public'));

//fire controller
todoController(app);

app.listen(port ,function(){
    console.log('listening' + port); 
});
