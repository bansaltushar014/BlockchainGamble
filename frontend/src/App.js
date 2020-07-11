import React,  { useState, useEffect, useRef } from 'react';
import './App.css';
import webValue from './helper';
import openSocket from 'socket.io-client';
const axios = require('axios');
const  socket = openSocket('http://localhost:4000');

function App() {

  const [account, setAccount] = useState('');
  const [gamble, setGamble] = useState('');
  var globalInstance = useRef(0);


  useEffect(() => {
    console.log(webValue);
    
    // Interect with Smart contract here
    console.log("Inside!");
    // var socket1 = socket('/stackabuse');
    // socket.emit('clientEvent', 'Sent an event from the client!');
    InitiateContract();
  });

  const  InitiateContract = ()=> {
    axios.get('http://localhost:4000/static/Gamble.json')
    .then(function (response) {
      console.log(response.data);
      // setGamble(response.data);
      var User = response.data;
      const globalAbi = User.abi;
      const globalContractAddress = User.networks[3].address;
      globalInstance = new webValue.eth.Contract(globalAbi, globalContractAddress);
      JoinRoom();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const JoinRoom = () => {
    socket.on('connectToRoom',function(data) {
      console.log(data);
    });
  }

  const joinTheRoom = () => {
    
    webValue.eth.getAccounts().then(async (accounts) => {
      console.log(accounts);
      await globalInstance.methods.getEth().send({
        from: accounts[0], 
        value: 1000000000000000 
       })
      // await webValue.eth.sendTransaction({from:accounts[0],to: '0xbc4f953855ac579254a6e8ba5edb1ad6e8192711', value:webValue.utils.toWei('0.05')})
            .then(()=> {
              alert("sent");
              setAccount("value");
            })
  })
}

  return (
    <div>
      {!account && (
        <button onClick={joinTheRoom}>join</button>
      )}
      {account && (
        <div className="App">
          Joined
      </div>
      )}    
    </div>
  );
}

export default App;
