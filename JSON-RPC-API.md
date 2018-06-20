[JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON ([RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)) as data format.

As we will see, using JSON-RPC is not always convenient, especially for programming purpose. The [web3.js](https://github.com/ethereum/web3.js) library is the Ethereum compatible JavaScript API which gives a convenient interface for the JSON-RPC methods. We will talk more about it in [this](https://github.com/rszheng/Ethereum-Develop/blob/master/JavaScript-API.md) page.

The default JSON-RPC endpoint for ```geth``` is ```http://localhost:8545```. 

To start the HTTP JSON-RPC, use
```
$ geth --rpc
```
You can change the default port (8545) and listning address (localhost) with:
```
$ geth --rpc --rpcaddr <ip> --rpcport <portnumber>
```

## Curl examples

Check [this](https://github.com/ethereum/wiki/wiki/JSON-RPC) link for a full list of JSON-RPC methods and curl examples. Here we give some examples only to indicate how to use JSON-RPC APIs with curl.

