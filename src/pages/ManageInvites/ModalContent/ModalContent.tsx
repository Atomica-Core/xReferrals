import React from 'react';
import styled from 'styled-components';
import { Props } from '.';
import { PrimaryBtn, SecondaryBtn } from '../../../components/ui/Button';
import { FilledContainer, GreenContainer } from '../../../components/ui/Container';
import { Text1, Text2 } from '../../../components/ui/Text';
import Title from '../../../components/ui/Title';
import InvitesTable from './InvitesTable';

const ModalContent: React.FC<Props> = ({ close, title, headline, submit, inviteRows, claimable, claim }: Props) => {
  return (
    <>
      <Row>
        <Title>{title}</Title>
        <Icon onClick={close}>❌</Icon>
      </Row>
      <FilledContainer style={{ padding: '20px' }}>
        <Text2> {headline}</Text2>
      </FilledContainer>
      <GreenContainer>
        <Row>
          <ColumnCenter>
            <Text1 style={{ color: 'white' }}>
              {`CLAIMABLE:`}
              <strong>{` ${claimable} USDC`}</strong>
            </Text1>
          </ColumnCenter>
          <SecondaryBtn onClick={claim}>Claim</SecondaryBtn>
        </Row>
      </GreenContainer>
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
const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 10px;
  margin-right: -30px;
`;
