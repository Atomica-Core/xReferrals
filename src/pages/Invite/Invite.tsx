import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Props } from '.';
import ModalContent from './ModalContent';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';

const SHEET_ID = process.env.REACT_APP_INVITE_SHEET_ID!;

const Invite: React.FC<Props> = ({ isOpen, toggle }) => {
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, seetDescription] = useState('');
  useEffect(() => {
    async function loadSheet() {
      const rows = await connectToGoogleSheets(SHEET_ID);
      if (!rows) return;
      setTitle(rows[0].value);
      setHeadline(rows[1].value);
      seetDescription(rows[2].value);
    }
    loadSheet();
  }, []);
  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalContent title={title} headline={headline} description={description} close={toggle} />
      </Modal>
    </div>
  );
};

export default Invite;
