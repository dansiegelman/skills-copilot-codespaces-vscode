// Create Web Server
// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');
var comments = [];

// Create web server
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('404 Not Found.');
            } else {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(data);
            }
        });
    } else if (pathname === '/post') {
        fs.readFile('./post.html', function (err, data) {
            if (err) {
                console.log(err);
                res.end('404 Not Found.');
            } else {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(data);
            }
        });
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                console.log(err);
                res.end('404 Not Found.');
            } else {
                res.setHeader('Content-Type', mime.getType(pathname));
                res.end(data);
            }
        });
    } else if (pathname === '/comments') {
        var callback = urlObj.query.callback;
        if (callback) {
            res.end(callback + '(' + JSON.stringify(comments) + ')');
        } else {
            res.end(JSON.stringify(comments));
        }
    } else if (pathname === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        res.end('404 Not Found.');
    }
}).listen(8080, function () {
    console.log('Server is running at http://