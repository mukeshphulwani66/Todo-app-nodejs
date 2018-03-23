var bodyParser = require('body-parser');
var mongoose = require('mongoose');



mongoose.connect('mongodb://todotest:todotest@ds229648.mlab.com:29648/todo_bymukesh');

var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item:'get milk'},{item:'coding life'},{item:'sleep'}];

module.exports = function(app){


    app.get('/todo',function(req,res){
   // get data form mdb and pass or render to view 
        Todo.find({},function(err,data){
         if(err) throw err;
         res.render('todo',{todos:data});
        });
     
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
// get data from view and add it to mdb
var newTodo = Todo(req.body).save(function(err,data){
   if(err) throw err;
   res.json(data);
  });
      });

     app.delete('/todo/:item',function(req,res){
         // delete data from mdb
         Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
             if(err) throw err;
            res.json(data);
         });
          
      });
}