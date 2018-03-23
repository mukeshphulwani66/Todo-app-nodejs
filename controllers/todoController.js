var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//put your mlab database link here  in format as shown below
mongoose.connect('mongodb://name:name@somename.mlab.com:number/databasename');

var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item:'get milk'},{item:'coding life'},{item:'sleep'}];

module.exports = function(app){


    app.get('/',function(req,res){
   // get data form mdb and pass or render to view 
        Todo.find({},function(err,data){
         if(err) throw err;
         res.render('todo',{todos:data});
        });
     
    });
    
    app.post('/',urlencodedParser,function(req,res){
// get data from view and add it to mdb
var newTodo = Todo(req.body).save(function(err,data){
   if(err) throw err;
   res.json(data);
  });
      });

     app.delete('/:item',function(req,res){
         // delete data from mdb
         Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
             if(err) throw err;
            res.json(data);
         });
          
      });
}
