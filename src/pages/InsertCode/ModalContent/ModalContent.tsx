import React from 'react';
import styled from 'styled-components';
import { Props } from '.';

const ModalContent: React.FC<Props> = ({
  close,
  title,
  headline,
  description,
  inputValue,
  onChangeValue,
  submit,
}: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <span> {headline}</span>
      <br />
      <span> {description}</span> <br />
      <br />
      <input value={inputValue} onChange={(e) => onChangeValue(e.target.value)} />
      <button onClick={submit}>OK</button>
    </>
  );
};

const Title = styled.h2`
  font-size: 22px;
  color: blue;
`;

export default ModalContent;
