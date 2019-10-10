var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url, request.method);
    var filePath;
    //var distPath = './dist/students-management-element';
    var distPath = './static';
    if (request.url.startsWith('/api/')) {
      filePath = './static'
        + (request.url.endsWith('/') ? request.url.substring(0, request.url.length - 1) : request.url.substring(0, request.url.length))
        + '.json';
    } else if (request.url ==='/students-management' || request.url === '/students-management/') {
      filePath = distPath + '/index.html';
    } else {
      filePath = distPath + (request.url.endsWith('/') ? request.url.substring(0, request.url.length - 1) : request.url.substring(0, request.url.length));
    }

    fs.exists(filePath, function(exist) {
      if (!exist) {
        filePath = distPath + '/index.html';
      } else {
        if (fs.statSync(filePath).isDirectory()) {
          filePath =  distPath + '/index.html';
        }
      }
      var extname = String(path.extname(filePath)).toLowerCase();
      var mimeTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.gif': 'image/gif',
          '.wav': 'audio/wav',
          '.mp4': 'video/mp4',
          '.woff': 'application/font-woff',
          '.ttf': 'application/font-ttf',
          '.eot': 'application/vnd.ms-fontobject',
          '.otf': 'application/font-otf',
          '.svg': 'image/svg+xml'
      };

      var contentType = mimeTypes[extname] || 'application/octet-stream';

      if (request.method == 'OPTIONS') {
        response.writeHead(200, {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Length': '0',
          'Content-Type': contentType
         });
        response.end();
      } else {
        console.log('reading file: ', filePath);
        fs.readFile(filePath, function(error, content) {
          if (error) {
              if(error.code == 'ENOENT') {
                  fs.readFile('./404.html', function(error, content) {
                      response.writeHead(200, { 'Content-Type': contentType });
                      response.end(content, 'utf-8');
                  });
              }
              else {
                  response.writeHead(500);
                  response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                  response.end();
              }
          }
          else {
              response.writeHead(200, {
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': contentType
              });
              response.end(content, 'utf-8');
          }
        });
      }

    });


}).listen(8070);
console.log('Server running at http://127.0.0.1:8070/');
