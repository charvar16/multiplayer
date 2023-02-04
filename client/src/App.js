import logo from './logo.svg';
import './App.css';
import OpenGames from './OpenGames';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Game from './Game'
import MoveContextProvider from './MoveContext';
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');
let roomId

function App() {
  // Variables definition
  let openGames = [];
  let roomPlayers = { creator: socket.id, opponent: 'WAITING' };
  const [board, setBoard] = useState(openGames);
  let room

  // Socket communication
  socket.on('initBoard', (juegosAbiertos)=>{
    setBoard(juegosAbiertos)
  })

  function newGame(){
    socket.emit('createdRoom', roomPlayers)
    roomId = socket.id
  }
  socket.on('updateGameBoard', (updated) =>{
    openGames = updated
    console.log('openGamesData '+JSON.stringify(openGames))
    setBoard(updated);
  })

  const joinGame = (creator) =>{
    socket.emit('joinRoom', creator)
    room=creator
  }

  const exitGame = () =>{
    if(socket.id === roomId){
      socket.emit('exitRoom', socket.id)
    }
  }

          // TicTacToe Methods
  const prueba = () => {
    //socket.emit('playerMove', move)
    console.log('AAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHH')
  }
  const prueba2 = 5
  socket.on('opponentMove', (opMov) =>{
    //update the variable allowing movement on TicTacToe.js
  })
  //openGamesData.openGames.findIndex(obj => obj.creator === room)
  const data = {
    roomEmpty: roomPlayers.opponent === 'WAITING',
    XorO: (socket.id===roomId)? 'XYZ' :
            (socket.id===room)? 'O' : null
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<OpenGames games={board} joinGame={joinGame}/>} />
              <Route path="/Game" element={
                <MoveContextProvider value={prueba}>
                  <Game exitGame={exitGame}/>
                </MoveContextProvider>                
              } />

          </Routes>
          <NavLink to='/Game' onClick={newGame} style={({ isActive }) => 
            ({visibility: isActive ? 'hidden' : 'visible' })}>Create a New Game</NavLink>
          <NavLink to='/' onClick={exitGame} style={({ isActive }) => 
            ({visibility: isActive ? 'hidden' : 'visible' })}>Exit Game</NavLink>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
