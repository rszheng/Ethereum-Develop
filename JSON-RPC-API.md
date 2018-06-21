[JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON ([RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)) as data format.

As we will see, using JSON-RPC is not always convenient, especially for programming purpose. The [web3.js](https://github.com/ethereum/web3.js) library is the Ethereum compatible JavaScript API which gives a convenient interface for the JSON-RPC methods. We will talk more about it in [this](https://github.com/rszheng/Ethereum-Develop/blob/master/JavaScript-API.md) page.

The default JSON-RPC endpoint for ```geth``` is ```http://localhost:8545```. 

To start the HTTP JSON-RPC, use
```
$ geth --rpc
```
You can change the default port (8545) and listening address (localhost) with:
```
$ geth --rpc --rpcaddr <ip> --rpcport <portnumber>
```

## Curl examples

Check [this](https://github.com/ethereum/wiki/wiki/JSON-RPC) link for a full list of JSON-RPC methods and curl examples. We give examples here only to indicate how to use JSON-RPC APIs with curl.

The general usage would look as follows:
```
curl --data '{"jsonrpc":"2.0","method":<METHOD>,"params":[PARAMS],"id":<value>}' localhost:8545
```
The part ```"jsonrpc":"2.0"``` should never be changed since ```geth``` supports only JSON-RPC 2.0. The ```<value>``` of ```"id"``` is just an identifier to be chosen by the Client (or the terminal user). As the JSON-RPC [2.0](http://www.jsonrpc.org/specification) specifies, the value of ```"id"``` must contain a String, Number, or Null value, and it should normally not be Null and Numbers should not contain fractional parts.

### Get the current network id

There are several Ethereum networks, each with a unique network id:

- ```"1"```: Ethereum Mainnet
- ```"2"```: Morden Testnet (deprecated)
- ```"3"```: Ropsten Testnet
- ```"4"```: Rinkeby Testnet
- ```"42"```: Kovan Testnet

To get the current network id, use the ```net_version``` method, which requires no parameter:
```
curl --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":9}' localhost:8545
```
In case the response is a complain about the content type, something like:
```
invalid content type, only application/json is supported
```
this is because the ```--data``` option sets the content type to application/x-www-form-urlencoded. To resolve this, use the tag ```-H "Content-Type:application/json``` at the start of the call.
```
// Request
curl -H "Content-Type:application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":9}' localhost:8545

// Result
{"jsonrpc":"2.0","id":9,"result":"4"}
```

### Get accounts

To get a list of addresses owned by the client, use the ```eth_accounts``` method:
```
// Request
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":3}' localhost:8545

// Result
{"jsonrpc":"2.0","id":3,"result":["0xd90b635922ed690b35c93503ff58e5022eed8ec5","0x4bc2983a5f10c3471c31db51ca48d6a6e7c21080"]}
```

### Get balance

To get balance of an account, use the ```eth_getBalance``` method with parameters

1. ```DATA``` - address of the account to check for balance, 20 bytes
2. ```TAG``` - block parameter, which can be one of the following:

    - ```HEX String``` - an integer block number
    - ```String "earliest"``` - for the earliest/genesis block
    - ```String "latest"``` - for the latest mined block
    - ```String "pending"``` - for the pending state/transactions
    
**Example**

```
// Request
curl --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xd90b635922ed690b35c93503ff58e5022eed8ec5", "latest"],"id":5}' localhost:8545

// Result
{"jsonrpc":"2.0","id":5,"result":"0x50eaf8af71fe8800"}
```
Note that the value of ```"result"``` is encoded as hex.

### Send transactions

To transfer ethers, use the ```eth_sendTransaction``` method. In fact, any kind of transactions, including contract creation, can be done with this method. The ```"params"``` is a transaction objection with the following fields:

- ```from```: the address the transaction is sent from.
- ```to```: the address the transaction is directed to, optional when creating new contract.
- ```gas```: the gas amount provided for the transaction execution, optional with default: 90000
- ```gasPrice```: the gasPrice used for each paid gas, optional with default: To-Be-Determined
- ```value```: the amount of ethers sent with this transaction, optional
- ```data```: the compiled code of a contract, or the hash of the invoked contract method sigature and encoded parameters; can be empty if only to transfer ethers.
- ```nonce```: the transaction nonce, optional.

**Example**

```
// Request
curl --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0xd90b635922ed690b35c93503ff58e5022eed8ec5", "to":"0x4bc2983a5f10c3471c31db51ca48d6a6e7c21080","gas":"0x76c0","gasPrice":"0x2540be400","value":"0x332592e00","data":""}],"id":7}' localhost:8545

// Result
{"jsonrpc":"2.0","id":7,"result":"0x642df229594c187abe37544333794906a287921e1a75bdcb03ef5d6d98f379c0"}
```
Note that you need to [unlock](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options) the ```from``` account first. 

The returned ```"result"``` is the transaction hash. You can use ```eth_getTransactionReceipt``` to get the transaction receipt (after the transaction was mined):
```
// Request
curl --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x642df229594c187abe37544333794906a287921e1a75bdcb03ef5d6d98f379c0"],"id":23}' localhost:8545

// Result
{"jsonrpc":"2.0","id":23,"result":{"blockHash":"0xf6f1a114fca6fceea0e9f7c50dd8f9aad458d7f9ed160e95bb14361b2f027064","blockNumber":"0x2620b4","contractAddress":null,"cumulativeGasUsed":"0x5208","from":"0xd90b635922ed690b35c93503ff58e5022eed8ec5","gasUsed":"0x5208","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":"0x4bc2983a5f10c3471c31db51ca48d6a6e7c21080","transactionHash":"0x642df229594c187abe37544333794906a287921e1a75bdcb03ef5d6d98f379c0","transactionIndex":"0x0"}}
```

> **Remark**. To send more complex transactions, we need to provide the ```"data"``` field for the transaction object. We will learn this along with [Smart Contract](https://github.com/rszheng/Ethereum-Develop/blob/master/SmartContract.md).


