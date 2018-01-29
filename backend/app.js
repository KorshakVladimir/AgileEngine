var express = require('express'),
    MongoClient = require('mongodb').MongoClient;
var app = express();
var url = ('mongodb://localhost/projectProduct');
var db;

MongoClient.connect(url, function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  var server = app.listen(3000, function (){
  console.log('Listening on port ' + server.address().port);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('express-cors')

app.use(cors({
    allowedOrigins: ['http://localhost:8080']
}));

var findproducts = function (callback) {
  var collection = db.collection('products');
  collection.find({}).toArray(function (err, items) {
    callback(items);
  });
};

app.get('/api/product/', function (req, res) {
    findproducts(function (docs) {
      res.json(docs);
    });
});

var insertDocuments = function (data, callback) {
  var collection = db.collection('products');
  collection.insertOne(data, function (err, result) {
    callback(result);
  });
};

app.post('/api/product/', function (req, res) {
    insertDocuments(req.body, function (result) {
      res.json(req.body);
    });
  });
});
