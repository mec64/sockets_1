var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

var server = app.listen(8000, function(){
    console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('Using sockets!');
    console.log(socket.id);
    socket.on('new_form', function(data){
        console.log(data);
        var random_number = Math.ceil(Math.random() * 1000);
        console.log(random_number);
        socket.emit('server_response', {name: data.name, location: data.location, language: data.language, comment: data.comment, random_number: random_number});
    });
});