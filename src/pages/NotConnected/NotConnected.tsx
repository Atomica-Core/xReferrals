import React from 'react';
import Modal from 'react-modal';
import Title from '../../components/ui/Title';
import animationData from '../../components/ui/json/eth.json';
import Lottie from 'react-lottie';

export interface NotConnectedProps {}

const NotConnected: React.FC<NotConnectedProps> = () => {
  const content = {
    width: '500px',
    height: 'fit-content',
    position: 'absolute',
    margin: '5% auto',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: '20px 50px',
    fontFamily: "Heebo', sans-serif!important",
    boxShadow: 'rgba(42,44,208,0.15) 0px 0.8rem 3.2rem 0px',
  } as React.CSSProperties;

  const overlay = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0)',
  } as React.CSSProperties;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    isClickToPauseDisabled: false,
  };
  return (
    <Modal isOpen={true} style={{ content, overlay }}>
      <Title style={{ textAlign: 'center' }}>Not connected to any wallets, please connect</Title>
      <Lottie options={defaultOptions} height={300} width={400} isStopped={false} isPaused={false} />
    </Modal>
  );
};

export default NotConnected;
