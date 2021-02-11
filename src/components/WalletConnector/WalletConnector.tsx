import React, { ReactNode, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from '../../hooks';
import { Web3Provider } from '@ethersproject/providers';
import NotConnected from '../../pages/NotConnected';

export interface WalletConnectorProps {
  children: ReactNode;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
  const triedEager = useEagerConnect();
  const context = useWeb3React<Web3Provider>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function activateWeb3() {
      if (context.active && context.library) {
        console.log('active');
        setIsConnected(true);
      } else {
        console.log('not active');
        setIsConnected(false);
      }
    }
    activateWeb3();
  }, [context.active, context.library, triedEager]);

  return <>{isConnected ? children : <NotConnected />}</>;
};

export default WalletConnector;
