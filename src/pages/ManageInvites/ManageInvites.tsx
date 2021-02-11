import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Props } from './';
import ModalContent from './ModalContent';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';
import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { useEagerConnect } from '../../hooks';
import Loader from '../../components/Loader/Loader';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { ContractApi, ContractEnum } from '../../utils/contractApi';
import { BigNumber } from 'bignumber.js';

const DESCRIPTION_SHEET_ID = process.env.REACT_APP_INVITE_SHEET_ID!;
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const InsertCode: React.FC<Props> = ({ isOpen, toggle }) => {
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [claimable, setClaimable] = useState('');
  const [googleSheet, setGoogleSheet] = useState<GoogleSpreadsheetWorksheet>();
  const [inviteRows, setInviteRows] = useState<GoogleSpreadsheetRow[]>([]);
  const [loading, setLoading] = useState(false);

  const context = useWeb3React<Web3Provider>();

  const loadDescriptionSheet = async () => {
    const conn = await connectToGoogleSheets(DESCRIPTION_SHEET_ID);
    if (!conn?.rows) return;
    console.log(conn);
    setTitle(conn.rows[0].value);
    setHeadline(conn.rows[1].value);
    setLoading(false);
  };

  const loadInvitesCreatedByTheUser = async () => {
    const conn = await connectToGoogleSheets(ADMIN_SHEET_ID);
    if (!conn?.rows) return;
    setGoogleSheet(conn.sheet);
    const rowsFromUser = conn.rows.filter((row) => row.createdBy === context.account);
    setInviteRows(rowsFromUser);
    setLoading(false);
  };

  const createInvite = async () => {
    if (inviteRows.length >= 5) {
      toast.error('Invites limit exceeded');
      return;
    }
    try {
      setLoading(true);
      await googleSheet?.addRow({
        inviteCode: nanoid(8),
        createdBy: context.account || '',
        activatedBy: '',
        expirationDate: '',
        isValid: '1',
      });
      await loadInvitesCreatedByTheUser();
      setLoading(false);
      toast('💸 Invite Created');
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error('Something wrong happened');
    }
  };

  useEffect(() => {
    async function activateWeb3() {
      getClaimable();
      loadDescriptionSheet();
      loadInvitesCreatedByTheUser();
    }
    setLoading(true);

    activateWeb3();
  }, []);

  const getClaimable = async () => {
    try {
      const signer = context.library?.getSigner();
      const referralProgram = ContractApi.initContract(ContractEnum.ReferralProgram, signer);
      const claimable = await referralProgram.referralFees(context.account);
      setClaimable(new BigNumber(claimable.toString()).div('1e6').toPrecision(3));
    } catch (e) {
      console.log('ERROR', e);
      // props.setLoading(false);
    }
  };

  const claim = async () => {
    try {
      if (Number(claimable) <= 0) {
        toast.error('Not enough money to claim');
        return;
      }
      setLoading(true);
      const referralProgram = ContractApi.initContract(ContractEnum.ReferralProgram, context.library?.getSigner());
      const tx = await referralProgram.claimReferralFee({
        gasLimit: 8000000,
      });
      await tx.wait(1);
      await getClaimable();
      setLoading(false);
      toast('💸 Claimable redeemed!');
    } catch (e) {
      toast.error('Error');
      setLoading(false);
    }
  };

  const content = {
    width: '500px',
    height: 'fit-content',
    position: 'absolute',
    margin: '5% auto',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: '20px 50px',
    fontFamily: "Heebo', sans-serif!important",
    boxShadow: 'rgba(42,44,208,0.15) 0px 0.8rem 3.2rem 0px',
  } as React.CSSProperties;

  const overlay = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
  } as React.CSSProperties;

  return (
    <div>
      <Modal isOpen={isOpen} style={{ content, overlay }}>
        <ModalContent
          claimable={claimable}
          title={title}
          headline={headline}
          close={toggle}
          submit={createInvite}
          inviteRows={inviteRows}
          claim={claim}
        />
        {loading && <Loader />}
      </Modal>
    </div>
  );
};

export default InsertCode;
