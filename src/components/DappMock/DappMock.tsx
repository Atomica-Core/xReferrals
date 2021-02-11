import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ContractApi, ContractEnum, getContractAddress } from '../../utils/contractApi';
import { GasStationService } from '../../utils/gasStation';
import Loader from '../Loader';

export interface DappMockProps {}

const DappMock: React.FC<DappMockProps> = () => {
  const [loading, setLoading] = useState(false);
  const [referral, setReferral] = useState('');
  const context = useWeb3React<Web3Provider>();
  const gasPriceService = new GasStationService();

  const setUserAllowance = async () => {
    try {
      setLoading(true);

      const Erc20 = ContractApi.initContract(ContractEnum.USDC, context.library?.getSigner());

      const gasPrice = await gasPriceService.getFastPrice();
      const tx = await Erc20.approve(getContractAddress(ContractEnum.ReferralProgram), '10000000', { gasPrice });

      await tx.wait(1);

      const allowance = await Erc20.allowance(context.account, getContractAddress(ContractEnum.ReferralProgram));
      console.log(allowance.toString());
      toast('Allowance set');
    } catch (e) {
      toast.error('Error');
      console.log('ERROR', e);
    } finally {
      setLoading(false);
    }
  };

  const payPremium = async (referral: string) => {
    try {
      const referralProgram = ContractApi.initContract(ContractEnum.ReferralProgram, context.library?.getSigner());

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

  return (
    <>
      <button onClick={setUserAllowance}> set user allowance</button>
      <button onClick={() => payPremium(referral)}> pay premium</button>
      <input onChange={(e) => setReferral(e.target.value)} value={referral} />
      {loading && <Loader />}
    </>
  );
};

export default DappMock;
