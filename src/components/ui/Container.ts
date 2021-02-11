import styled from 'styled-components';
import { lightBlue } from './GlobalStyles';

const DashedContainer = styled.div`
  border: 1.5px dashed rgba(168,175,201,0.25);
  border-radius:5px;
`;
export const FilledContainer = styled.div`
  border-radius:5px;
  background-color: ${lightBlue}

`

export default DashedContainer;
