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

const DESCRIPTION_SHEET_ID = process.env.REACT_APP_INVITE_SHEET_ID!;
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const InsertCode: React.FC<Props> = ({ isOpen, toggle }) => {
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, seetDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [signer, setSigner] = useState<JsonRpcSigner>();
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
    seetDescription(conn.rows[2].value);
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
      loadDescriptionSheet();
      loadInvitesCreatedByTheUser();
    }
    setLoading(true);

    activateWeb3();
  }, []);

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
          title={title}
          headline={headline}
          description={description}
          close={toggle}
          inputValue={inviteCode}
          onChangeValue={setInviteCode}
          submit={createInvite}
          inviteRows={inviteRows}
        />
        {loading && <Loader />}
      </Modal>
    </div>
  );
};

export default InsertCode;
