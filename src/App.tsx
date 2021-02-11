import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import InsertCode from './pages/InsertCode/types';
import ManageInvites from './pages/ManageInvites/types';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalStyle } from './components/ui/GlobalStyles';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import WalletConnector from './components/WalletConnector/WalletConnector';
import Loader from './components/Loader';
import Root from './components/Root';

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
  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletConnector>
          {/* <button onClick={toggleIsInsertCodeOpen}>Insert invite code modal</button>
          <button onClick={toggleIsInviteOpen}>Share code modal</button>
          <InsertCode isOpen={isInsertCodeOpen} toggle={toggleIsInsertCodeOpen} />
          <ManageInvites isOpen={isInviteOepn} toggle={toggleIsInviteOpen} /> */}
          <Root />
        </WalletConnector>
      </Web3ReactProvider>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
