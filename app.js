//valid urls
    //https://www.google.com
    //http://www.google.com
    //http://google.com
//mongodb://<dbuser>:<dbpassword>@ds013564.mlab.com:13564/url-shortener

// DONT USE JADE.....USE HTML



var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
//var obtainUrl = require('./mongouserpass.js');
var validUrl = require('valid-url');


//var url = obtainUrl.getUrl();
var url = process.env.MONGOLAB_URI;
var appUrl = 'http://url-shortener-micro.herokuapp.com/';

function randomNumber(){
  return Math.floor((Math.random() * 10000));
}

app.get('/', function(req, res){
   res.sendFile(process.cwd() + '/views/main.html'); 
});

app.get('/new', function(req, res){
    res.end('Error, you need to enter a valid URL');
});

app.get('/:num', function(req, res){
   var lookupNum = Number(req.params.num);
   
   mongo.connect(url, function(err, db){
       if (err) {
           console.log('Unable to connect to MongoDB server. Error: ', err);
       }
       else {
           console.log('Connection established find');
           var collection = db.collection('urls');
           collection.find({url_id: lookupNum}).toArray(function(err, results){
               if(err) {
                   res.end('Error');
                   
               }
               else if (results.length === 0){
                   res.end('Error: this URL is not in the database');
                   db.close();
                }
               else {
                   res.redirect(results[0].webaddress);
                   db.close();
               
               }       
            });
           
           
       }
   });
   
   
});

app.get('/new/*', function(req, res){
   
   var enteredUrl = req.params[0];
   var randomNum = randomNumber();
   
   if (!validUrl.isHttpUri(enteredUrl) && !validUrl.isHttpsUri(enteredUrl)) {
       res.end('Wrong URL format, please try again');
   }
   else {
       
       //now need to access database
       //add the url and idnumber
       
       mongo.connect(url, function(err, db){
            if (err){
                console.log('Unable to connect to MongoDB server. Error: ', err);
            }
            else {
                console.log('Connection established insert');
                var collection = db.collection('urls');
                var url1 = { webaddress: enteredUrl, short_url: appUrl + randomNum, url_id: randomNum };
                
                collection.insert(url1, function(err, result){
                    if(err) {
                        console.log('Error: ', err);
                    }
                    else {
                        console.log('success');
                        res.end(JSON.stringify({webaddress: enteredUrl, short_url: appUrl + randomNum}));
                        db.close();
                    }
                });
                
            }
        });
       
   }
   
   
});



app.listen(process.env.PORT || 3000, function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});