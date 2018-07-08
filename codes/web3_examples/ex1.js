var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

var accounts = web3.eth.accounts;
// console.log(accounts);

var balance = web3.eth.getBalance(accounts[0]);

// cosole.log("Balance of '"+accounts[0]+"': "+balance.toString());
console.log("Balance of '"+accounts[0]+"': "+web3.fromWei(balance.toString(),'ether')+" ether");
