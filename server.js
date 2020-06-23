'use strict';
var developerNameDefault = "Bhavani Chintakrindi";
var developerCountryDefault = "India";
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//create handlebars with default layout
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req,res,next) {
    res.render('home', {
        layout: 'main',
        developerName: developerNameDefault,
        countryName: developerCountryDefault
    });

});

app.post('/contact', function (req, res, next) {
    console.log(req.body);//print all request body to console log
    res.render('contact');
       
    });



//Need declare handle all error http here (after your get /post/put actions etc)
//404 not found
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});
//500 server Error
app.use(function (err,req,res,next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
    
app.listen(app.get('port'), function () {
    console.log('express started on http:// localhost:' + app.get('port'));
})