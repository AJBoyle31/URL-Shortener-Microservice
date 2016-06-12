//valid urls
    //https://www.google.com
    //http://www.google.com
    //http://google.com
//mongodb://<dbuser>:<dbpassword>@ds013564.mlab.com:13564/url-shortener

// DONT USE JADE.....USE HTML



var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var url = 'mongodb://localhost:27017/url-shortener';

MongoClient.connect(url, function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB server. Error: ', err);
    }
    else {
        console.log('Connection established to', url);
        db.close();
    }
});

//test variables
var urla = 'https://www.google.com';
var urlb = 'https://google.com';
var urlc = 'https://google.net';
var urld = 'http://www.google.com';
var urle = 'http://google.com';
var urlf = 'http://google.net';
var urlg = 'www.google.com';

app.set('view engine', 'jade');

app.get('/', function(req, res){
   res.render('main'); 
});

app.get('/new/:enteredurl', function(req, res){
   var enteredUrl = req.params.url;
   
   
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});