pragma solidity ^0.5.11;

contract Gamble {
  
  struct users{
  address [] allUsers;
  }
  
  uint roomnum = 0;
  uint players = 0;
  mapping(uint => users) pointToUser ;
  mapping(uint => uint) pointToMoney;
  
// address payable seller;
   
  constructor() payable public {
  // seller = msg.sender;
    }

  function getEth() external payable{
      pointToUser[roomnum].allUsers.push(msg.sender);
      pointToMoney[roomnum] =  pointToMoney[roomnum] + msg.value;
      players++;
      
      if(players % 5 == 0)
        roomnum++;
        
  }
  
  function gameusers(uint id) public view returns (address[] memory){
      return pointToUser[id].allUsers;
  }
  
  function gameMoney(uint id) public view returns (uint) {
      return pointToMoney[id];
  }
  
  function show() external view returns(uint){
      return address(this).balance;
  }
  
  function sendEth(address payable receiver) external {
      receiver.transfer(10000000000000000);
  }
  
}
