import styled from 'styled-components';
import { highLightGreen, lightBlue } from './GlobalStyles';

const DashedContainer = styled.div`
  border: 1.5px dashed rgba(168,175,201,0.25);
  border-radius:5px;
`;
export const FilledContainer = styled.div`
  border-radius:5px;
  background-color: ${lightBlue};
`;

export const GreenContainer = styled.div`
    border-radius: 8px;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding: 20px;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    max-width: 650px;
    background-color: ${highLightGreen};
`

export default DashedContainer;
