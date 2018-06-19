Go-ethereum is the Golang client of Ethereum, and is often called ```geth``` for short. ```geth``` will be run as an Ethereum node (full or light) with an CLI. It can also be used by other processes as a gateway into the Ethereum network via JSON RPC. 

To install and start running ```geth```, follow the official [instructions](https://github.com/ethereum/go-ethereum).

After installation of the latest version of ```geth``` and going through some basic commands such as ``` $ geth console ``` and ```$ geth --rinkeby console ```, we can use 
```
$ geth help
```
to list all ```geth``` commandlines with illustrations. A ```geth``` command line goes as follows:
```
$ geth [options] command [command options] [arguments ...]
```

The following is some key commands and options:
```
COMMANDS:
  account                           Manage accounts
  console                           Start an interactive JavaScript environment
  attach                            Start an interactive JavaScript environment (connect to node)
  init                              Bootstrap and initialize a new genesis block

ETHEREUM OPTIONS:
  --datadir "PathOfDataDirectory"   Data directory for the databases and keystore
  --testnet                         Ropsten network: pre-configured proof-of-work test network
  --rinkeby                         Rinkeby network: pre-configured proof-of-authority test network
  --syncmode "fast"                 Blockchain sync mode ("fast", "full", or "light")
  
ACCOUNT OPTIONS:
  --unlock value                    Comma separated list of accounts to unlock
  --password value                  Password file to use for non-interactive password input

API AND CONSOLE OPTIONS:
  --rpc                             Enable the HTTP-RPC server
  --rpcapi "db,eth,net,web3"        API's offered over the HTTP-RPC interface
  --rpcaddr value                   HTTP-RPC server listening interface (default: "localhost")
  --rpcport value                   HTTP-RPC server listening port (default: 8545)

NETWORKING OPTIONS:
  --port value                      Network listening port (default: 30303)
  --maxpeers value                  Maximum number of network peers (network disabled if set to 0) (default: 25)
  --nodiscover                      Disables the peer discovery mechanism (manual peer addition)
  
MINER OPTIONS:
  --mine                            Enable mining
  --gasprice "18000000000"          Minimal gas price to accept for mining a transactions
```


  
