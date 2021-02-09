import React from 'react';
import Web3 from 'web3';


const web3 = new Web3('http://localhost:7545');

const Web3Context = React.createContext(web3);


export default Web3Context;