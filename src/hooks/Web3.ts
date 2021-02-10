import React from 'react';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';



const web3 = new Web3(new HDWalletProvider({
  mnemonic: "dune scan visual expose chef area creek copy peanut choice brief accident",
  providerOrUrl: "https://rinkeby.infura.io/v3/4baa7d1e5d0747dcade252f1a9e26351"
}));

const Web3Context = React.createContext(web3);


export default Web3Context;