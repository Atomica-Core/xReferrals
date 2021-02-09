import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import InsertCode from './pages/InsertCode/types';
import Invite from './pages/Invite/types';
import Web3 from 'web3';

const theme = {
  colors: {
    primary: '#000',
  },
};

function App() {
  const [isInsertCodeOpen, setIsInsertCodeOpen] = useState(false);
  const toggleIsInsertCodeOpen = () => setIsInsertCodeOpen(!isInsertCodeOpen);

  const [isInviteOepn, setIsInviteOepn] = useState(false);
  const toggleIsInviteOpen = () => setIsInviteOepn(!isInviteOepn);

  useEffect(() => {
    async function load() {
      // console.log(await web3.eth.getAccounts());
    }
    load();
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <Web3Context.Provider value={web3}> */}
      <button onClick={toggleIsInsertCodeOpen}>Insert invite code modal</button>
      <button onClick={toggleIsInviteOpen}>Share code modal</button>
      <InsertCode isOpen={isInsertCodeOpen} toggle={toggleIsInsertCodeOpen} />
      <Invite isOpen={isInviteOepn} toggle={toggleIsInviteOpen} />
      {/* </Web3Context.Provider> */}
    </ThemeProvider>
  );
}

export default App;
