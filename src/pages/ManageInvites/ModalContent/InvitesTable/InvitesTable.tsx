import React from 'react';
import styled from 'styled-components';
import DashedContainer from '../../../../components/ui/Container';
import { grey } from '../../../../components/ui/GlobalStyles';
import { Text3 } from '../../../../components/ui/Text';
import { FeaturedTitle } from '../../../../components/ui/Title';
import { Props } from './';

const InvitesTable: React.FC<Props> = ({ inviteRows }) => {
  const getFeaturedInvite = () => inviteRows.find((row) => row.activatedBy === '')?.inviteCode;
  return (
    <>
      <FeaturedTitle>{getFeaturedInvite()}</FeaturedTitle>
      <DashedContainer>
        <HeightControlContainer>
          {inviteRows.map((row) => (
            <ValueContainer key={row.inviteCode}>
              <Text3>{row.inviteCode}</Text3>
              <Text3 style={!row.activatedBy ? { color: grey } : {}}>{row.activatedBy || 'Not used yet'}</Text3>
            </ValueContainer>
          ))}
        </HeightControlContainer>
      </DashedContainer>
    </>
  );
};

export default InvitesTable;

const ValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
`;
const HeightControlContainer = styled.div`
  max-height: 300px;
  overflow-x: auto;
`;
