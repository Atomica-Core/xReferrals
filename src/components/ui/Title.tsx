import styled from 'styled-components';
import { blue, lightBlue } from './GlobalStyles';

const Title = styled.h2`
  font-size: 24px;
  color: #3f4277;
  font-weight: bold;
  line-height: 40px;
`;

export const FeaturedTitle = styled.h2`
  font-size: 24px;
  color: #3f4277;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  text-shadow: 0 0 2px rgba(42, 44, 208, 0.15), 0 0 2px ${blue};
`;

export default Title;
