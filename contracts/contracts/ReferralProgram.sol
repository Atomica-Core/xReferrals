// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

interface IERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ReferralProgram {

  using SafeMath for uint256;

  IERC20 public paymentToken;
  uint256 public paymentAmount;
  uint256 public referralFee;

  mapping(address => uint256) public referralFees;

  constructor(
    address paymentToken_,
    uint256 paymentAmount_,
    uint256 referralFee_ // 1e18 scaled
  ) {
    paymentToken = IERC20(paymentToken_);
    paymentAmount = paymentAmount_;
    referralFee = referralFee_;
  }

  function payPremium(address referral_) external {
    paymentToken.transferFrom(msg.sender, address(this), paymentAmount);

    if (referral_ != address(0)) {
      referralFees[referral_] = referralFees[referral_].add(paymentAmount.mul(referralFee).div(1E18));
    }
  }

  function claimReferralFee() external {
    if (referralFees[msg.sender] > 0) {
      uint256 amount = referralFees[msg.sender];
      referralFees[msg.sender] = 0;
      paymentToken.transfer(msg.sender, amount);
    }
  }
}

