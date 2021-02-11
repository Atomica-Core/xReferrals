import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Props } from './';
import ModalContent from './ModalContent';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { GasStationService } from '../../utils/gasStation';
import { ContractApi, ContractEnum, getContractAddress } from '../../utils/contractApi';
import { constants } from 'ethers';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { injected } from '../../utils/connectors';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';

const DESCRIPTION_SHEET_ID = process.env.REACT_APP_INSERT_CODE_SHEET_ID!;
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const InsertCode: React.FC<Props> = ({ isOpen, toggle }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [headline, setHeadline] = useState('');
  const [description, seetDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const context = useWeb3React<Web3Provider>();

  const loadDescriptionSheet = async () => {
    setLoading(true);
    try {
      const conn = await connectToGoogleSheets(DESCRIPTION_SHEET_ID);
      if (!conn?.rows) {
        toast.error('Oops! Something wrong happened');
        return;
      }
      setTitle(conn.rows[0].value);
      setHeadline(conn.rows[1].value);
      seetDescription(conn.rows[2].value);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error('Oops! Something wrong happened');

      console.log(e);
    }
  };

  // const setUserAllowance = async () => {
  //   try {
  //     console.log(signer);
  //     const Erc20 = ContractApi.initContract(ContractEnum.USDC, signer);
  //     const wei = constants.MaxUint256;
  //     console.log(wei.toString());
  //     const gasPrice = await gasPriceService.getFastPrice();
  //     const tx = await Erc20.approve(getContractAddress(ContractEnum.ReferralProgram), '10000000', { gasPrice });

  //     await tx.wait(1);

  //     const allowance = await Erc20.allowance(context.account, getContractAddress(ContractEnum.ReferralProgram));
  //     console.log(allowance.toString());
  //     console.log('SUCCESSSS');
  //   } catch (e) {
  //     console.log('ERROR', e);
  //   }
  // };

  // const payPremium = async (referral: string) => {
  //   try {
  //     console.log(signer);
  //     const referralProgram = ContractApi.initContract(ContractEnum.ReferralProgram, signer);

  //     // const gasPrice = await gasPriceService.getFastPrice();
  //     const tx = await referralProgram.payPremium(referral, {
  //       gasLimit: 8000000,
  //     });

  //     await tx.wait(1);
  //     console.log('SUCCESSSS');
  //   } catch (e) {
  //     console.log('ERROR', e);
  //     // props.setLoading(false);
  //   }
  // };

  const validateInviteCode = (rows: GoogleSpreadsheetRow[]) => {
    for (let row of rows) {
      if (row.inviteCode === inviteCode && row.isValid === '1') {
        return row;
      }
    }
    return false;
  };

  const submitInviteCode = async () => {
    try {
      setLoading(true);
      const conn = await connectToGoogleSheets(ADMIN_SHEET_ID);

      if (!conn) return;

      const currentAccount = context.account;
      const validatedInviteCodeRow = validateInviteCode(conn.rows);
      console.log(validatedInviteCodeRow);
      if (validatedInviteCodeRow) {
        // await setUserAllowance();
        // await payPremium(validatedInviteCodeRow.createdBy);
        validatedInviteCodeRow.activatedBy = currentAccount;
        validatedInviteCodeRow.isValid = '0';
        await validatedInviteCodeRow.save();
        setLoading(false);

        toast('💸 Success');
        toggle();
      } else {
        setLoading(false);

        toast.error('Sorry, invalid invite');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);

      toast.error('Oops! Something wrong happened');
    }
  };

  useEffect(() => {
    async function activateWeb3() {
      loadDescriptionSheet();
    }
    activateWeb3();
  }, []);

  const content = {
    width: '500px',
    height: '450px',
    position: 'fixed',
    margin: '5% auto',
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: '20px 50px',
    fontFamily: "Heebo', sans-serif!important",
    boxShadow: 'rgba(42,44,208,0.15) 0px 0.8rem 3.2rem 0px',
  } as React.CSSProperties;

  const overlay = {
    position: 'fixed',
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
          submit={submitInviteCode}
        />
        {loading && <Loader />}
      </Modal>
    </div>
  );
};

export default InsertCode;
