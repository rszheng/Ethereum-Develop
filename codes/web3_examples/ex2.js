var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

var blockID = 1234567;
var info = web3.eth.getBlock(blockID);
// console.log(info);

var transaction = web3.eth.getTransactionFromBlock(blockID,0);

// Alternatively, use the following (when not running a light node):
//
/* var txHash = info.transactions[0];
   var transaction = web3.eth.getTransaction(txHash);
*/

console.log(transaction);
