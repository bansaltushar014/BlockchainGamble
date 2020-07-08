import React,  { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:4000');

function App() {

  useEffect(() => {
    console.log("Inside!");
    // var socket1 = socket('/stackabuse');
    // socket.emit('clientEvent', 'Sent an event from the client!');
    socket.on('connectToRoom',function(data) {
      console.log(data);
    });

  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
