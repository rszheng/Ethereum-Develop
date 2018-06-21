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
$ curl --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":9}' localhost:8545
```
In case the response is a complain about the content type, something like:
```
invalid content type, only application/json is supported
```
this is because the ```--data``` option sets the content type to application/x-www-form-urlencoded. To resolve this, use the tag ```-H "Content-Type:application/json``` at the start of the call.
```
// Request
$ curl -H "Content-Type:application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":9}' localhost:8545

// Result
{"jsonrpc":"2.0","id":9,"result":"4"}
```

### Get accounts

To get a list of addresses owned by the client, use ```eth_accounts``` method:
```
// Request
$ curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":3}' localhost:8545

// Result
{"jsonrpc":"2.0","id":3,"result":["0xd90b635922ed690b35c93503ff58e5022eed8ec5","0x4bc2983a5f10c3471c31db51ca48d6a6e7c21080"]}
```

### Send transactions




