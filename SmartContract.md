In this tutorial, you will learn:
- what a smart contract looks like, 
- how to register a smart contract to Ethereum blockchain, and 
- how to interact with the registered smart contract.

### A simple smart contract

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

### Register a contract to Ethereum blockchain

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

There are many ways to create contracts (and send transactions), using the console, JSON-RPC-API, or JavaScript-API. Essentially, these are all the same. Frameworks such as [Truffle](https://truffleframework.com/) are much more convenient to create contracts but with the drawback of hiding all transaction details, which is not a good start point for learning contracts and transactions. To play around with truffle, you can check out [these](https://github.com/rszheng/truffle-exercises) examples.

We will use web3.js, the JavaScript-API. Have a quick look at web3.js at [this](https://github.com/rszheng/Ethereum-Develop/blob/master/JavaScript-API.md) link.










### Interact with contracts

