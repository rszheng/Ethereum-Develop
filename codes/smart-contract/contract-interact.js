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

// get the contract abi and 
var abi = compiled.contracts[':SimpleStorage'].interface;

// creation of contract object
var myContract = web3.eth.contract(JSON.parse(abi)); 

// initiate a contract instance for the deployed contract address
var myContractInstance = myContract.at("0x91439b6c169b35dd73b67247ad6107a7c55ebab6");

// get the value of state variable storedData
var result = myContractInstance.get();
console.log('storedData: ' + result);

// modify the value of state variable storedData
// this will send out a transaction, 
// after a while, you can get the new value of storedData using get()
myContractInstance.set(9);
console.log('storedData modified!');


/*
 * Alternatively, use the following:
myContractInstance.set(8, function(err, result){
    if(!err) 
        console.log(result);
    else
        console.error(err);
});
*/
