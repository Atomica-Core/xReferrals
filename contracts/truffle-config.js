require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {

  networks: {

    rinkeby: {
      // MNEMONIC: BIP39 mnemonic, e.g. https://iancoleman.io/bip39/#english
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY, 0, 10),
      websockets: true,
      network_id: 4,
      confirmation: 1,
      timeoutBlocks: 2000,
      skipDryRun: true,
      gas: 8000000,
      gasPrice: 10E9,
    },
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: '0.7.4',
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      }
    }
  },
};
