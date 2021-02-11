import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GlobalStyle } from './components/ui/GlobalStyles';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import WalletConnector from './components/WalletConnector/WalletConnector';
import Root from './components/Root';

const theme = {
  colors: {
    primary: '#000',
  },
};

function App() {
  const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletConnector>
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
