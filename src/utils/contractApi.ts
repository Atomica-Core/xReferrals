import { Contract } from 'ethers';

import * as Erc20 from '../abi/Erc20Mock.json';
import * as ReferralProgram from '../abi/ReferralProgram.json';
import { networkAddresses } from './networkAddresses';



export enum ContractEnum {
  USDC,
  ReferralProgram
}

export function getContractAddress(contractName: ContractEnum) {
  const contract = ContractEnum[contractName];
  return networkAddresses.rinkeby[contract];
}


export class ContractApi {
  public static initContract(contract: ContractEnum, signer: any): Contract {
    return this.initContractWithAddress(contract, signer, getContractAddress(contract));
  }

  public static initContractWithAddress(contract: ContractEnum, signer: any, address: string): Contract {
    const abi = ContractApi.getContractAbi(contract);

    // @ts-ignore
    const contractObject = new Contract(address, abi, signer);

    return contractObject;
  }

  public static getContractAbi(contract: ContractEnum): any {
    switch (contract) {
      case ContractEnum.ReferralProgram:
        return ReferralProgram.abi;

      case ContractEnum.USDC:
        return Erc20.abi;

      default:
        throw new Error('Unknown contract.');
    }
  }
}
