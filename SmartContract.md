In this tutorial, you will learn how to:
- write a smart contract, 
- register the smart contract to Ethereum blockchain, and 
- interact with the registered smart contract.

### Writing a smart contract

There are several languages that can be used to write a smart contract, such as LLL, Serpent, Solidity, Vyper, etc. But the most commonly used language is Solidity, which has a syntax similar to JavaScript, C++ or Java. Others are not so popular and even rarely used today. 

We will only use Solidity to write smart contracts. 

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
