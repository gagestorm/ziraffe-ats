var express = require('express'),base_url='http://localhost:3000/';
var app = express(),
    exphbs  = require('express-handlebars');
var request = require('request');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var util = require('util'),
    EventEmitter = require('events').EventEmitter;


app.engine('.hbs', exphbs({defaultLayout: 'main',extname:'.hbs'}));
app.set('view engine', '.hbs'); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
    
});
mongoose.connect('mongodb://localhost/ziraffe');

var registrationSchema  = new mongoose.Schema({
      name : String
    , updated: { type: Date, default: Date.now }
    , email : String
    , companyName : String 
    , location : String
    , oldSolution: String
    , companySize: String
    , country : String
});

var Registration = mongoose.model('Registration', registrationSchema);


app.use("/public", express.static(__dirname + "/public"));

//Basic application getting loaded : The web interface.
app.get('/',function(req,res){
    res.render('home', { data : { base_url : base_url } } );     
});


app.get('/list/list/registration',function(req,res){


    Registration.find({},null, {sort: { updated: -1}},function(err,data){
        if(err) return console.error(err);
        var listData = [];
        data.forEach( function(value , index ){
            listData.push(
                { 
                    name: value.name,
                    email: value.email,
                    updated: value.updated,
                    companyName : value.companyName,
                    location: value.location,
                    oldSolution : value.oldSolution,
                    companySize : value.companySize,
                    country: value.country
                }
            );
        });
        res.render('list.hbs', { data: { listData : listData , base_url: base_url } } ); 
    });

});

    
app.post('/register',function(req,res){
    
    // Perform the form testing here...
    var newRegister = new Registration({
          name   : req.body.name
        , email  : req.body.email
        , companyName: req.body.company
        , location: req.body.location
        , oldSolution: req.body.previous
        , companySize : req.body.size 
        , country : req.body.country
    });

    newRegister.save(function(err,t) {
      if (err) return console.error(err);
      console.log('A registration has been done');
      console.log(t);
      res.send({ success: true });
    });      

});

http.listen(3000,function(){
    console.log('Listening on *:3000');
});
