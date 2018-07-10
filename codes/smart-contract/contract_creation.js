// setting up web3 
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

const fs = require('fs');
const solc = require('solc'); // require the compiler

// import solidity source code and get it compiled
var source = fs.readFileSync('SimpleStorage.sol', 'utf8');
var compiled = solc.compile(source,1);

// contract bytecode
var bytecode = '0x' + compiled.contracts[':SimpleStorage'].bytecode;

// set the default account for transactions
// remember to use your (unlocked) account
web3.eth.defaultAccount = "0xd90b635922ed690b35c93503ff58e5022eed8ec5";

// estimate total gas to be used
var gasEstimate = web3.eth.estimateGas({data: bytecode});

// create contract
// the transaction will be sent from web3.eth.defaultAccount and to the
// (default) null address, implying a contract-creation 
web3.eth.sendTransaction({data: bytecode, gas: gasEstimate}, function(err, transactionHash) {  
    // This is a callback function, will be run after the transaction was sent
    if(!err) {
        console.log('txHash: ' + transactionHash)
    } else {
        console.error(err);
        return;
    }
});


/*
 * Alternatively, you can use web3.eth.contract() to create a contract

var abi = compiled.contracts[':SimpleStorage'].interface; //contract json abi
var myContract = web3.eth.contract(JSON.parse(abi)); 

myContract.new({data: bytecode, gas: gasEstimate}, function(err, contract){
    if(!err) {
        // NOTE: the callback will be fired twice!
        // Once the contract has the transactionHash property set and once it's
        // deployed on the blockchain.
        //
        if(!contract.address) {
            // This will run on the first call, and will display the transactionHash
            console.log('txHash: ' + contract.transactionHash);
        } else {
            // This will run on the second call, after the contract is deployed
            // on the blockchain
            console.log('address: ' + contract.address);
        }
    } else {
        console.error(err);
        return;
    }
});

*/
