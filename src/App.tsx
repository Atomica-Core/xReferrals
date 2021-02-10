import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import InsertCode from './pages/InsertCode/types';
import Invite from './pages/Invite/types';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalStyle } from './components/ui/GlobalStyles';

const theme = {
  colors: {
    primary: '#000',
  },
};

function App() {
  const [isInsertCodeOpen, setIsInsertCodeOpen] = useState(true);
  const toggleIsInsertCodeOpen = () => setIsInsertCodeOpen(!isInsertCodeOpen);

  const [isInviteOepn, setIsInviteOepn] = useState(false);
  const toggleIsInviteOpen = () => setIsInviteOepn(!isInviteOepn);
  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <button onClick={toggleIsInsertCodeOpen}>Insert invite code modal</button>
        <button onClick={toggleIsInviteOpen}>Share code modal</button>
        <InsertCode isOpen={isInsertCodeOpen} toggle={toggleIsInsertCodeOpen} />
        <Invite isOpen={isInviteOepn} toggle={toggleIsInviteOpen} />
      </Web3ReactProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
