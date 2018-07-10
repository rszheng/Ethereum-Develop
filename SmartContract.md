In this tutorial, you will learn:
- what a smart contract looks like, 
- how to register a smart contract to Ethereum blockchain, and 
- how to interact with the registered smart contract.

## A simple smart contract

There are several languages that can be used to write a smart contract, such as LLL, Serpent, Solidity, Vyper, etc. But the most commonly used language is Solidity, which has a syntax similar to JavaScript, C++ or Java. Others are not so popular and some even rarely used today. Hence we will only use Solidity to write smart contracts. 

A smart contract looks like the following:

```
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```
The first line is a preprocessing statement, which tells that the contract is written for a Solidity compiler of version 0.4.0 or newer up to version 0.5.0 (not included). 

The contract itself is like a ```class``` in JavaScript/C++/Java. Variables and functions (or methods) can be defined and used within the contract. 

The contract ```SimpleStorage``` has one variable ```storedData``` of type ```uint```(unsigned integer). It has two functions: ```set(uint x)``` will set the variable ```storedData``` to the value ```x```, and ```get()``` will simply return the current value of ```storedData```. 

Both of the functions are of type ```public```, which means that they can be called either internally (i.e. from within the current contract or contracts deriving from it), or via transactions (or messages). The ```get()``` function is also declared with a modifier ```view```, which means that it will never modify the state (of the blockchain). 

Here I will not even try to write a detailed guide on Solidity, but the readers are advised to take a look at some tutorials like [this](https://ethereumbuilders.gitbooks.io/guide/content/en/solidity_tutorials.html) one. To fully grasp the language, go through the [official documentation](http://solidity.readthedocs.io/). Bear in mind that the language is still in constant changing and it is always a good idea to consult the latest version.

## Register a contract to Ethereum blockchain

To "register" a contract is, in fact, to create the contract on the blockchain. We will do this for the ```SimpleStorage``` contract. But before we actually do this, we need to know that creating a contract on the Ethereum blockchain costs Ether, which means real money! Therefore, we will instead use the Rinkeby testnet and we need to get some Ethers on the testnet (for free).  

Check out [this](https://github.com/rszheng/Ethereum-Develop/blob/master/go-ethereum.md) link for how to start using Rinkeby and get an account. To get free Ethers for your Rinkeby account, use the Rinkeby [faucet](https://www.rinkeby.io/#faucet).

Now I will assume that you have already get a Rinkeby account with some ethers. 

Let's start ```geth``` with your account unlocked (substitute my account with YourAccount!):
```
$ geth --unlock 0xd90b635922ed690b35c93503ff58e5022eed8ec5 --rpc --rinkeby console 2>> null
Unlocking account 0xd90b635922ed690b35c93503ff58e5022eed8ec5 | Attempt 1/3
Passphrase: 
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.10-stable/darwin-amd64/go1.10.2
coinbase: 0xd90b635922ed690b35c93503ff58e5022eed8ec5
at block: 2374378 (Wed, 30 May 2018 21:09:00 CST)
 datadir: /Users/zhengrs/Library/Ethereum/rinkeby
 modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> 
```
Aside from unlocking your account, this commandline does more: it enables RPC interface and opens a console. You can check in the console that your account has indeed enough ether:
```
> eth.getBalance("0xd90b635922ed690b35c93503ff58e5022eed8ec5")
6499580000000000000
```
This unlocked account will be used to send transactions later on. 

There are many ways to create contracts (and send transactions), using the console, JSON-RPC-API, JavaScript-API, etc. Essentially, all these are the same. Frameworks such as [Truffle](https://truffleframework.com/) are much more convenient to create contracts but with the drawback of hiding all transaction details, which is not a good start point for learning contracts and transactions. To play around with truffle, you can check out [these](https://github.com/rszheng/truffle-exercises) examples.

We will use [web3.js](https://github.com/ethereum/web3.js), the JavaScript-API. Take a quick look at web3.js at [this](https://github.com/rszheng/Ethereum-Develop/blob/master/JavaScript-API.md) link.

### Setting up work directory

```
$ mkdir contract-exercise
$ cd contract-exercise
```
Now in your work directory ```contract-exercise```, do the following:
```
$ npm init -y
$ npm install web3@0.20.6 
$ npm install fs
$ npm install solc@0.4.24
```
NOTE. You should first have ```Node.js``` and ```npm``` installed. 

The second line installs web3.js version 0.20.6, which is very different from version 1.0.x. We would like to use version 0.20.6 as version 1.0.x is currently under constant change and probably unsafe. The third line installes the File System module, which will be used to read contract file into a JS program. The final line installs the Solidity compiler module.

### Create the contract on blockchain

Copy [this](https://github.com/rszheng/Ethereum-Develop/blob/master/codes/smart-contract/SimpleStorage.sol) contract file into your working directory ```contract-exercise```. It contains exactly our example contract ```SimpleStorage```. Use the following to read the contract into your code:
```
const fs = require('fs');
var source = fs.readFileSync('SimpleStorage.sol', 'utf8');
```

To create a contract on blockchain, you need to send out a contract-creation transaction. There are several steps to do:

- Compile the contract and get its bytecode;
- Determine gas limit for contract creation;
- Compose the transaction object and send it to miners.

Let's elaborate on this. 

**Step 1** Compile ```source``` and get its bytecode
```
const solc = require('solc');
var compiled = solc.compile(source,1);
var bytecode = '0x' + compiled.contracts[':SimpleStorage'].bytecode;
```
Note that we have added the hexadecimal prefix ```0x``` to the original bytecode.

**Step 2** Estimate the gas for contract creation

The ```bytecode``` will be used for this.
```
var gasEstimate = web3.eth.estimateGas({data: bytecode});
```

**Step 3** Compose the transaction object

An transaction object has the following fields:

- ```from```: ```String``` - The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.
- ```to```: ```String``` - (optional) The destination address of the message, left undefined for a contract-creation transaction.
- ```value```: ```Number|String|BigNumber``` - (optional) The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction.
- ```gas```: ```Number|String|BigNumber``` - (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
- ```gasPrice```: ```Number|String|BigNumber``` - (optional, default: To-Be-Determined) The price of gas for this transaction in wei, defaults to the mean network gas price.
- ```data```: ```String``` - (optional) Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code.
- ```nonce```: ```Number``` - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

We have already take care of ```gas``` in Step 2. Other fields that must be specified are ```from``` and ```data```. For the rest, 

- ```to```: just left it undefined, default for contract-creation
- ```value```: left undefined, default to 0, since we will not endow any value to the contract ```SimpleStorage```
- ```gasPrice```: left undefined, use the default
- ```nonce```: left undefined, use the default

Hence the transaction object is:
```
{from: "0xd90b635922ed690b35c93503ff58e5022eed8ec5", gas: gasEstimate, data: bytecode}
```

Alternatively, you can set the defaultAccount for sending transactions:
```
web3.eth.defaultAccount = "0xd90b635922ed690b35c93503ff58e5022eed8ec5";
```
And then, the transaction object can be simplified to:
```
{gas: gasEstimate, data: bytecode}
```

**Step 4** Send the transaction
```
web3.eth.sendTransaction(transactionObject, function(err, transactionHash) {  
    // This is a callback function, will be run after the transaction was sent
    if(!err) {
        console.log('txHash: ' + transactionHash)
    } else {
        console.error(err);
        return;
    }
});
```

You can find [here](https://github.com/rszheng/Ethereum-Develop/blob/master/codes/smart-contract/contract_creation.js) a complete script for all these steps. Just copy the file ```contract_creation.js``` into your work directory ```contract-excercise```, substitute my account with yours, then run it:
```
$ node contract_creation.js
```
What returned is the transaction hash, which can be used to search on an [explorer](https://www.rinkeby.io/#explorer) for the transaction and hence the contract on blockchain. 

## Interact with the contract

To interact with a contract, you need to know its ABI, i.e. Application Binary Interface. 
A contract's ABI is just an array with descriptions of functions (and [events](http://solidity.readthedocs.io/en/v0.4.24/contracts.html#events)) of the contract. Check out [this](http://solidity.readthedocs.io/en/v0.4.24/abi-spec.html) link to learn more about contract ABI. To get the ABI of the contract ```SimpleStorage```:

- in a console:
```
$ solc --abi SimpleStorage.sol
```
- in a JS script:
```
const solc = require('solc');
var compiled = solc.compile(source,1);
var abi = compiled.contracts[':SimpleStorage'].interface;
```

Provided with a contract's ABI and address, we can use web3.eth.contract(abiArray) to interact with it. 
```
var abi = [ { 
    constant: false,
    inputs: [ [Object] ],
    name: 'set',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' 
}, { 
    constant: true,
    inputs: [],
    name: 'get',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' 
}];

// creation of contract object
var myContract = web3.eth.contract(abi);

// initiate a contract instance for the deployed contract address
var myContractInstance = myContract.at("0x91439b6c169b35dd73b67247ad6107a7c55ebab6")；

// get the value of state variable storedData
var result = myContractInstance.get();
console.log('storedData: ' + result);

// modify the value of state variable storedData
// this will send out a transaction, 
// after a while, you can get the new value of storedData using get()
myContractInstance.set(9);
console.log('storedData modified!');
```
Alternatively, use the following to set the value: 
```
myContractInstance.set(8, function(err, result){
    if(!err) 
        console.log(result);
    else
        console.error(err);
});
```
Since the ```set()``` method modifies state, calling ```set()``` will automatically send a transaction. You can explicitly send the transaction:
```
myContractInstance.set.sendTransaction(8, function(err, result){
    if(!err) 
        console.log(result);
    else
        console.error(err);
});
```
But ```get()``` method won't change state, calling ```get()``` is only a message call, will not send a transaction. You can explicitly make the message call:
```
myContractInstance.get.call();
```


    









