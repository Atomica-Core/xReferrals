const ReferralProgram = artifacts.require("ReferralProgram")
const Erc20Mock = artifacts.require("Erc20Mock")

module.exports = async (deployer, network) => {
  const premiumAmount = BigInt(10E6)
  const referralFee = BigInt(0.1E18)

  let paymentToken
  if (network === 'rinkeby') {
      paymentToken = '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b' // usdc
  } else {
    await deployer.deploy(Erc20Mock)
    const erc20Mock = await Erc20Mock.deployed()
    paymentToken = erc20Mock.address
  }

  await deployer.deploy(ReferralProgram, paymentToken, premiumAmount, referralFee)
};
