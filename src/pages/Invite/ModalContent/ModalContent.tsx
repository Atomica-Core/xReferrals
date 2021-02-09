import React from 'react';
import styled from 'styled-components';
import { Props } from '.';

const ModalContent: React.FC<Props> = ({ close, title, headline, description }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <span> {headline}</span>
      <br />
      <span> {description}</span> <br />
      <br />
      <button onClick={close}>Close</button>
    </>
  );
};

const Title = styled.h2`
  font-size: 22px;
  color: blue;
`;

export default ModalContent;
