  var express = require('express');
  var app = express();
  var fs = require("fs");
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.get('/', function(req,res){
    res.sendFile(__dirname+'/www/index.html');
  });

  app.use(express.static('./www'));

  io.on('connection', function(socket){

    socket.Info = {}

    socket.on('setAmount', x=> {socket.Info.amount = x});
    socket.on('load', x => {
      require('./module/spotify')(socket);
    });
  });

  http.listen(8080, function(){
    console.log('listening on *: http://localhost:8080');
  });

