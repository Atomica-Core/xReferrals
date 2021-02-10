import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Props } from './';
import ModalContent from './ModalContent';
import { connectToGoogleSheets } from '../../helpers/googleSheetsHelper';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { GasStationService } from '../../utils/gasStation';
import { ContractApi, ContractEnum, getContractAddress } from '../../utils/contractApi';
import { constants } from 'ethers';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { injected } from '../../utils/connectors';

const DESCRIPTION_SHEET_ID = process.env.REACT_APP_INSERT_CODE_SHEET_ID!;
const ADMIN_SHEET_ID = process.env.REACT_APP_ADMIN_SHEET_ID!;

const InsertCode: React.FC<Props> = ({ isOpen, toggle }) => {
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, seetDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [signer, setSigner] = useState<JsonRpcSigner>();

  const context = useWeb3React<Web3Provider>();

  const triedEager = useEagerConnect();

  const gasPriceService = new GasStationService();

  const loadDescriptionSheet = async () => {
    const rows = await connectToGoogleSheets(DESCRIPTION_SHEET_ID);
    if (!rows) return;
    setTitle(rows[0].value);
    setHeadline(rows[1].value);
    seetDescription(rows[2].value);
  };

  const setUserAllowance = async () => {
    try {
      console.log(signer);
      const Erc20 = ContractApi.initContract(ContractEnum.USDC, signer);
      const wei = constants.MaxUint256;
      console.log(wei.toString());
      const gasPrice = await gasPriceService.getFastPrice();
      const tx = await Erc20.approve(getContractAddress(ContractEnum.ReferralProgram), '10000000', { gasPrice });

      await tx.wait(1);

      const allowance = await Erc20.allowance(context.account, getContractAddress(ContractEnum.ReferralProgram));
      console.log(allowance.toString());
      console.log('SUCCESSSS');
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const payPremium = async (referral: string) => {
    try {
      console.log(signer);
      const referralProgram = ContractApi.initContract(ContractEnum.ReferralProgram, signer);

      // const gasPrice = await gasPriceService.getFastPrice();
      const tx = await referralProgram.payPremium(referral, {
        gasLimit: 8000000,
      });

      await tx.wait(1);
      console.log('SUCCESSSS');
    } catch (e) {
      console.log('ERROR', e);
      // props.setLoading(false);
    }
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

    const currentAccount = context.account;
    const validatedInviteCodeRow = validateInviteCode(rows);
    console.log(validatedInviteCodeRow);
    if (validatedInviteCodeRow) {
      await setUserAllowance();
      await payPremium(validatedInviteCodeRow.createdBy);
      validatedInviteCodeRow.activatedBy = currentAccount;
      validatedInviteCodeRow.isValid = '0';
      await validatedInviteCodeRow.save();
      alert('saved');
    } else {
      alert('error');
    }
  };

  useEffect(() => {
    async function activateWeb3() {
      try {
        console.log('context', context);
        if (context.active && context.library) {
          setSigner(context.library.getSigner());
          loadDescriptionSheet();
        } else {
          console.log('OOOOOOOOOOOOQ');
        }
      } catch (e) {
        console.log(e);
      }
    }
    activateWeb3();
  }, [triedEager]);

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
      </Modal>
    </div>
  );
};

export default InsertCode;
