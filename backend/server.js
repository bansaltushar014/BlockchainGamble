const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const socketIO = require('socket.io'); 
const http = require('http')  
// var fetch = require("./fetch");
const cors = require('cors');
const { dirname } = require('path');
const app = express();

const Schema = mongoose.Schema;
const port = process.env.PORT || 4000;
const path = require('path');
let server = http.createServer(app) 
let io = socketIO(server)  
 

var roomno = 1;
io.on('connection', (socket) => {
  console.log('a user connected');
//   socket.on('clientEvent', function(data) {
//     console.log(data);
//  });

//Increase roomno 2 clients are present in a room.
if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 5) roomno++;
socket.join("room-"+roomno);

//Send this event to everyone in the room.
io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

});

// var iosa = io.of('/stackabuse');
// iosa.on('connection', function(socket){
//     console.log('Connected to Stack Abuse namespace');
// });
// iosa.emit('stats', { data: 'some data' });


// mongoose.connect('mongodb://749c317d-0ee0-4-231-b9ee:rfWUGy5rJc3VwS3V4ix2QXPr4lOPH3CVu0umSeUUVhkx6lMl3ift7386Ksitg8UacVY66KMubB1KQQRcUphxaA%3D%3D@749c317d-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true',
//  { useNewUrlParser: true, useUnifiedTopology: true });
 
// var db = mongoose.connection;
 
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", function(callback) {
//    console.log("Mongo Connection Succeeded."); 
// });
 
app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../build/contracts')));
// app.get('/', fetch.data);
 
app.post('/api/postChainData', (req,res,next)=> {
 
//   console.log(req.body);
//   let chainData = new fetch.chainData();
 
//   chainData.name = req.body.name;
//   chainData.bookId = req.body.bookId;
//   chainData.price = req.body.price;
//   chainData.By = req.body.By;
//   chainData.image = req.body.image;
  
//   console.log("Inside postData!");
//   console.log(chainData); 
//   chainData.save(function(err, res) {
//   if (err) throw err;
//   console.log("1 document inserted");
  
//   });
//   res.send("done!");
});  
 
// app.get('/api/getChainData', fetch.getChainData);
 
//  It is for the testing
app.get('/api', (req,res) => {
  res.sendFile(__dirname + '/file.html');
})
 
// app.get('/json', (req, res) => {
//   res.sendFile(__dirname + '../build/contracts/Gamble.json');
// })

app.get('/', (req,res) => {
  res.send(" Working");
})

server.listen(port, () => console.log(`Listening on port ${port}`));