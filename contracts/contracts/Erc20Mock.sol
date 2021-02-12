// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20Mock is ERC20 {
  constructor() ERC20("MockToken", "MockToken") {
    _setupDecimals(6);
  }

  function mint(address account_, uint256 amount_) external {
    _mint(account_, amount_);
  }
}
