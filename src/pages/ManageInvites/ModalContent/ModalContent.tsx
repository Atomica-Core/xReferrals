import React from 'react';
import styled from 'styled-components';
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
      <Row>
        <Title>{title}</Title>
        <Icon onClick={close}>❌</Icon>
      </Row>
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 10px;
  margin-right: -30px;
`;
