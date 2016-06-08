//valid urls
    //https://www.google.com
    //http://www.google.com
    //http://google.com




var express = require('express');
var app = express();

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