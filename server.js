const express = require('express')
const app = express()
const port = 3000
const path = require("path");
//const { client, db } = require('./mongoConn');

const { createServer } = require("http");
const httpServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, { /* options */ });

const openGames = []

/* const clicks = db.collection('Clicks');
  const newClick = {
    ip : "despues de cambiar el package json"
  } */  

app.use(express.static(path.join(__dirname, "client", "build")))

async function main() {
  //await client.connect().then(console.log("Atlas Mongo connection succesful"));
  //  app.get('/', (req, res)   was originally here
  io.on('connection', socket => {

    app.get('/', (req, res) => {
      
      res.status(201).sendFile(path.join(__dirname, "client", "build"))
    })
    socket.emit('initBoard', openGames)
    
    socket.on('createdRoom', (room) =>{
      openGames.push(room)
      io.emit('updateGameBoard',openGames)
    })

    socket.on('joinRoom', (room) =>{
      let updateOpponent = openGames.findIndex(obj => obj.creator === room)
      openGames[updateOpponent].opponent = socket.id
      io.emit('updateGameBoard',openGames)
      socket.join(room)
      })

    socket.on('exitRoom', (creatorId) =>{
        console.log('in closeRoom')
      let roomIndex = openGames.findIndex(rooms => rooms.creator === creatorId)
      openGames.splice(roomIndex, 1)
      
      io.emit('updateGameBoard',openGames)
    })
  });
  httpServer.listen(port);
  //await clicks.insertOne(newClick).then(()=>console.log("Added new document to Mongo database"))
}

main()
  .then(console.log("Main promise fullfiled"))
  .catch(console.error)
//  .finally(() => client.close());