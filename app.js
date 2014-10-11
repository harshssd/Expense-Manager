/**
 * Created by harshssd on 10/10/14.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url, function(err){
    if(err)
        throw err;
    else
        console.log('Mongo is up and running');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

require('./routes/routes.js')(app);

app.get('/', function(req, res){
    res.send('running');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});