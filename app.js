//valid urls
    //https://www.google.com
    //http://www.google.com
    //http://google.com

// DONT USE JADE.....USE HTML



var express = require('express');
var app = express();

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

app.get('/new/:url', function(req, res){
   var url = req.params.url;
   
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});