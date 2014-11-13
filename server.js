var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

var formidable = require('formidable')
var util = require('util');

app.post('/upload', function(req, res){
	var form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, 'public', 'img')

    form.parse(req, function(err, fields, files) {
    	var p = files.file.path.split('\\');

     	var fileName = p[p.length - 1];
    	var src = '/img/' + fileName;

    	res.writeHead(200, {'content-type': 'text/plain'});
    	res.write(src);
     	res.end()
    });
})

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});