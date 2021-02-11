import React from 'react';
import { Props } from '.';
import { PrimaryBtn } from '../../../components/ui/Button';
import DashedContainer from '../../../components/ui/Container';
import Input from '../../../components/ui/Input';
import { Text2 } from '../../../components/ui/Text';
import Title from '../../../components/ui/Title';

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
      <DashedContainer style={{ padding: '20px' }}>
        <Text2> {headline}</Text2>
        <div style={{ marginTop: '10px' }}>
          <Text2> {description}</Text2>
        </div>
      </DashedContainer>
      <Input placeholder="Invite Code" value={inputValue} onChange={(e) => onChangeValue(e.target.value)} />
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <PrimaryBtn onClick={submit}>Let's Go!</PrimaryBtn>
      </div>
    </>
  );
};

export default ModalContent;
