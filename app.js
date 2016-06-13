//valid urls
    //https://www.google.com
    //http://www.google.com
    //http://google.com
//mongodb://<dbuser>:<dbpassword>@ds013564.mlab.com:13564/url-shortener

// DONT USE JADE.....USE HTML



var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;

//url in .gitignore
var url = process.env.MONGOLAB_URI;


mongo.connect(url, function(err, db){
    if (err){
        console.log('Unable to connect to MongoDB server. Error: ', err);
    }
    else {
        console.log('Connection established to', url);
        db.close();
    }
});


app.get('/', function(req, res){
   res.sendFile(process.cwd() + '/views/main.html'); 
});

app.get('/new/:enteredurl', function(req, res){
   var enteredUrl = req.params.url;
   
   
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});