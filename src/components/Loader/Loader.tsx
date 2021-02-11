import animationData from '../ui/json/loading.json';
import Lottie from 'react-lottie';
import styled from 'styled-components';

const Container1 = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255, 0.5);
`;
const Container2 = styled.div`
  margin: 90px auto;
`;

const Loader: React.FC = () => {
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
    <Container1>
      <Container2>
        <Lottie options={defaultOptions} height={300} width={300} isStopped={false} isPaused={false} />
      </Container2>
    </Container1>
  );
};

export default Loader;
