var express = require('express'); 
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');
var app = express();
var fs = require('fs');
var currentPath = path.resolve(__dirname); 

app.use(bodyParser.json());


app.get('/api/navigation', function (req, res) {
    console.log('GET: /api/navigation');
    jsonfile.readFile(currentPath + '/responses/navigation-main.json', function(err, obj) {
        res.send(JSON.stringify(obj));
    });
});

app.get('/api/products', function (req, res) {
    console.log('GET: /api/products');
    jsonfile.readFile(currentPath + '/responses/items.json', function(err, obj) {
        res.send(JSON.stringify(obj));
    });
});


let resourceNotFoundMiddleware = function (req, res, next) {
    console.log('NOT FOUND (404): ', req.originalUrl);
    res.status(404).json({
        Message: `No HTTP resource was found that matches the request URI '${req.originalUrl}'.`
    });
}

app.use('*', resourceNotFoundMiddleware);

app.listen(3001, function () { 
  console.log('Mock-server listening on port 3001');
});
