import Web3 from 'web3';

const web = {
    gweb: 'null',
    isDefine : function () {
        if (typeof web3 !== 'undefined' && window.ethereum) {
            // Use Mist/MetaMask's provider
            console.log("metamask");
            this.gweb = new Web3(window.ethereum);
            window.ethereum.enable();
          } else {
            console.log("called");
            this.gweb = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cdfba71cda344898bfcfeaee923cf849"));
            // this.gweb = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
          }
    }
}

web.isDefine();
export default web.gweb;
