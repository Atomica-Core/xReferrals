import React from 'react';
import { Props } from '.';
import { PrimaryBtn } from '../../../components/ui/Button';
import DashedContainer, { FilledContainer } from '../../../components/ui/Container';
import Input from '../../../components/ui/Input';
import { Text2 } from '../../../components/ui/Text';
import Title from '../../../components/ui/Title';
import InvitesTable from './InvitesTable';

const ModalContent: React.FC<Props> = ({
  close,
  title,
  headline,
  description,
  inputValue,
  onChangeValue,
  submit,
  inviteRows,
}: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <FilledContainer style={{ padding: '20px' }}>
        <Text2> {headline}</Text2>
        <div style={{ marginTop: '10px' }}>
          <Text2> {description}</Text2>
        </div>
      </FilledContainer>
      <InvitesTable inviteRows={inviteRows} />
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <PrimaryBtn onClick={submit}>Create Code</PrimaryBtn>
      </div>
    </>
  );
};

export default ModalContent;
