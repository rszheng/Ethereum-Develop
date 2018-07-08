The Ethereum compatible JavaScript API is the JavaScript library  [web3.js](https://github.com/ethereum/web3.js) which implements the JSON-RPC methods. 

In this tutorial, we will use [Node.js](https://nodejs.org/en/download/) and its JavaScript package manager [npm](https://docs.npmjs.com/getting-started/what-is-npm). Readers are supposed to be familar with Node.js and npm. If not, check the [web3.js](https://github.com/ethereum/web3.js) official instructions for other ways.


## Setting up web3

The latest version of web3.js is v1.0.0-beta.34. However, as web3.js v1.0 contains unaudited and potentially unsafe packages, and is not officially released, we will use instead the latest 0.2x.x version, which is v0.20.6. You can find the official documentation [here](https://github.com/ethereum/wiki/wiki/JavaScript-API) (for web3.js 1.0, check out [this](http://web3js.readthedocs.io/en/1.0/index.html) link). 

To get web3.js v0.20.6 into your project, using the following:
```
npm install web3@0.20.6
```
This will create a folder named ```node_modules``` and get all web3 relevent packages downloaded into it. 

Then in your project, use the following to get an instance of the web3 object:
```
var Web3 = require('web3');
var web3 = new Web3();
```
And set a provider
```
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
```
In case you need to make sure not overwriting an already set provider, check first if web3 is defined or not:
```
var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
```
After that, the object ```web3``` is ready for use.

**NOTE**. Before running your code, make sure you have started an Ethereum node with rpc available at http://localhost:8545 (default). Use the right rpc address/port if you have somehow modified the default setting.


## Examples with the web3 APIs

Let's begin with an empty working directory and do some easy-to-follow examples. 

**Setting up**
In your commandline window:
```
$ mkdir web3_examples
$ cd web3_examples
$ npm init -y
$ npm install web3@0.20.6
```
All the following is done in your working directory ```web3_examples```. 

**Accounts & balance**

In the directory ```web3_example```, create a file named ```ex1.js``` with the contents:
```
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
```

*List your accounts*:
```
var accounts = web3.eth.accounts;
console.log(accounts)
```
Add these lines to the end of ```ex1.js```, save the file and then in the terminal:
```
$ node ex1.js
[ '0xd90b635922ed690b35c93503ff58e5022eed8ec5',
  '0x4bc2983a5f10c3471c31db51ca48d6a6e7c21080' ]
```
*Get the balance of your first account*:
```
var balance = web3.eth.getBalance(accounts[0]);
console.log("Balance of '"+accounts[0]+"': "+balance.toString());
```
Then in the terminal:
```
$ node ex1.js
Balance of '0xd90b635922ed690b35c93503ff58e5022eed8ec5': 6499580000000000000
```
The balance is shown in Wei. We can *change it to Ether*:
```
console.log("Balance of '"+accounts[0]+"': "+web3.fromWei(balance.toString(),'ether')+" ether");
```
Then in the terminal:
```
$ node ex1.js
Balance of '0xd90b635922ed690b35c93503ff58e5022eed8ec5': 6.49958 ether
```

**Blockchain data**

In the directory ```web3_example```, create a file named ```ex2.js``` with the contents:
```
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
```

*Get the information of a given block*:
```
var info = web3.eth.getBlock(1234567);
console.log(info);
```
The in the terminal you can get:
```
$ node ex2.js
{ difficulty: BigNumber { s: 1, e: 0, c: [ 2 ] },
  extraData: '0xd783010703846765746887676f312e372e33856c696e7578000000000000000053985768543444d7cc932c9ac9749e84f1e034722460d7d1ba5cf0d717257c22685f762ed0e601251e613f9aa0354a73694bb77a3d1a66a6927113af0810c7ab01',
  gasLimit: 6749994,
  gasUsed: 56839,
  hash: '0xadc2b9f9d09b638ddbfce235b8a6e8dd17fd6c728c8dd25bb519811d2e3309cc',
  logsBloom: '0x00000000000000004000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000',
  miner: '0x0000000000000000000000000000000000000000',
  mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0000000000000000',
  number: 1234567,
  parentHash: '0x061246dcfce0d937b72c981cf920a1098724c14b00fdacb22eec47eb6f7cbb6e',
  receiptsRoot: '0x498486817b3dd9cb6a89af96b413ec161bd586c63ac79a0c80da1b8aa250f6cb',
  sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: 864,
  stateRoot: '0x3236ad7b663062097d7473d292c04963837cab8f077237438e5adc026dfb3d9b',
  timestamp: 1510572232,
  totalDifficulty: BigNumber { s: 1, e: 6, c: [ 2399576 ] },
  transactions: 
   [ '0x58d5db9c726458c1b7f371e8d4365dc587ff0a7b26568cb32dd3eac1b44859e5',
     '0x4699b635d2e6a6a3a3ba663ad7b86e6bef30c7e20c787225d6af538ccd70d911' ],
  transactionsRoot: '0x7733e70c8cdbb745e64c2aadd8430e9fcb849a202062ae8e1ce30e098163ee27',
  uncles: [] }
  ```
  Note that I'm using the Rinkeby network. 
 
 *Get a transaction*: we will check the first transaction of block 1234567:
 ```
 var transaction = web3.eth.getTransactionFromBlock(1234567,0);
 console.log(transaction);
 ```
 In the terminal:
 ```
 $ node ex2.js
 { blockHash: '0xadc2b9f9d09b638ddbfce235b8a6e8dd17fd6c728c8dd25bb519811d2e3309cc',
  blockNumber: 1234567,
  from: '0x486348dc760eb7c18fddeb89921d003794a0404e',
  gas: 31500,
  gasPrice: BigNumber { s: 1, e: 10, c: [ 20000000000 ] },
  hash: '0x58d5db9c726458c1b7f371e8d4365dc587ff0a7b26568cb32dd3eac1b44859e5',
  input: '0x',
  nonce: 203,
  to: '0xf830062d49592c2288f1e64fcd66fe3b7023f10e',
  transactionIndex: 0,
  value: BigNumber { s: 1, e: 18, c: [ 50000 ] },
  v: '0x2b',
  r: '0xc8b878fd8cdee14fee5ed3c7167a9ed5661bd2c5c99d5aca5e839c802f7c47da',
  s: '0x5c8b49c21872ceaec3e5f559d8cf9f0740670637e0e8f9c67ac346e6c1c07022' }
 ```

Also, you can *get a transaction by its hash*:
```
var txHash = '0x58d5db9c726458c1b7f371e8d4365dc587ff0a7b26568cb32dd3eac1b44859e5';
var transaction = web3.eth.getTransaction(txHash);
console.log(transaction);
```
However, this will not work if you're syncing in ```light``` mode, i.e. if you're running a light node. This is because a light node doesn't make index of transactions except those it is interested in.


**Remark**. We will learn more web3.js APIs that allow you to create contracts and send transactions. Check out [this](https://github.com/rszheng/Ethereum-Develop/blob/master/SmartContract.md) tutorial. 

 

