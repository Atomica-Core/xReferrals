import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Props } from './';
import ModalContent from './ModalContent';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';
import Web3Context from '../../hooks/Web3';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
const DESCRIPTION_SHEET_ID = process.env.REACT_APP_INSERT_CODE_SHEET_ID!;
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const InsertCode: React.FC<Props> = ({ isOpen, toggle }) => {
  const web3 = useContext(Web3Context);
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, seetDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const loadDescriptionSheet = async () => {
    console.log(await web3.eth.getAccounts());
    const rows = await connectToGoogleSheets(DESCRIPTION_SHEET_ID);
    if (!rows) return;
    setTitle(rows[0].value);
    setHeadline(rows[1].value);
    seetDescription(rows[2].value);
  };

  const validateInviteCode = (rows: GoogleSpreadsheetRow[]) => {
    for (let row of rows) {
      if (row.inviteCode === inviteCode && row.isValid === '1') {
        return row;
      }
    }
    return false;
  };

  const submitInviteCode = async () => {
    const rows = await connectToGoogleSheets(ADMIN_SHEET_ID);
    if (!rows) return;
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    const validatedInviteCodeRow = validateInviteCode(rows);
    console.log(validatedInviteCodeRow);
    if (validatedInviteCodeRow) {
      validatedInviteCodeRow.activatedBy = currentAccount;
      await validatedInviteCodeRow.save();
      alert('saved');
    } else {
      alert('error');
    }
  };

  useEffect(() => {
    loadDescriptionSheet();
  }, []);
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalContent
          title={title}
          headline={headline}
          description={description}
          close={toggle}
          inputValue={inviteCode}
          onChangeValue={setInviteCode}
          submit={submitInviteCode}
        />
      </Modal>
    </div>
  );
};

export default InsertCode;
