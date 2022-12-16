require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()

GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const mnemonic = process.env.mnemonic
module.exports = {
  defaultNetwork: "hardhat",
  networks:{

  goerli: {
    url: GOERLI_RPC_URL,
    accounts: { mnemonic: mnemonic },
    chainId: 5,
    blockConfirmations: 6,
},

 
hardhat: {
  chainId: 31337,
  // gasPrice: 130000000000,
},

localhost: {
  chainId: 31337,
},

  },


namedAccounts:{
  deployer:{
    default: 0,
  },
  user: {
    default: 1,
  }
},

etherscan: {
  apiKey: ETHERSCAN_API_KEY,
},
gasReporter: {
  enabled: false,
  currency: "USD",
  // outputFile: "gas-report.txt",
  // noColors: true,
  // coinmarketcap: COINMARKETCAP_API_KEY,
}, 
//For differnt versions of solidity
solidity: {
  compilers: [
      {
          version: "0.8.17",
      },
      {
          version: "0.6.6",
      },
  ],
},
};
