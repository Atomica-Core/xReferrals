import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';
import InsertCode from '../../pages/InsertCode/types';
import ManageInvites from '../../pages/ManageInvites/types';
import Loader from '../Loader';

export interface RootProps {}
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const Root: React.FC<RootProps> = () => {
  const [isInsertCodeOpen, setIsInsertCodeOpen] = useState(false);
  const toggleIsInsertCodeOpen = () => setIsInsertCodeOpen(!isInsertCodeOpen);

  const [isInviteOepn, setIsInviteOepn] = useState(false);
  const toggleIsInviteOpen = () => setIsInviteOepn(!isInviteOepn);

  const [isAlreadyInvited, setIsAlreadyInvited] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useWeb3React<Web3Provider>();

  useEffect(() => {
    async function isUserAlreadyInvited() {
      try {
        setLoading(true);
        const conn = await connectToGoogleSheets(ADMIN_SHEET_ID);
        if (!conn?.rows) {
          toast.error('Oops! Something wrong happened');
          return;
        }
        if (!conn.rows.find((row) => row.activatedBy === context.account)) {
          setIsInsertCodeOpen(true);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);

        console.log(e);
      }
    }
    isUserAlreadyInvited();
  }, []);

  return (
    <>
      {/* <button onClick={toggleIsInsertCodeOpen}>Insert invite code modal</button> */}
      <button onClick={toggleIsInviteOpen}>Share code modal</button>
      {loading ? (
        <Loader />
      ) : (
        <>
          <InsertCode isOpen={isInsertCodeOpen} toggle={toggleIsInsertCodeOpen} />
          <ManageInvites isOpen={isInviteOepn} toggle={toggleIsInviteOpen} />
        </>
      )}
    </>
  );
};

export default Root;
