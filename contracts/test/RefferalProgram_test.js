const assert = require('assert')

const Erc20Mock = artifacts.require('Erc20Mock')
const ReferralProgram = artifacts.require('ReferralProgram')


contract('ReferralProgram', (accounts) => {
  it('should accept premium and accrue referral fee, if referral address is defined', async () => {
    const erc20Mock = await Erc20Mock.deployed()
    const referralProgram = await ReferralProgram.deployed()

    const payer = accounts[0]
    const referral = accounts[1]
    const paymentAmount = BigInt(100E18)

    await erc20Mock.mint(accounts[0], paymentAmount)
    await erc20Mock.approve(referralProgram.address, paymentAmount)

    await referralProgram.payPremium(referral)

    const accruedFee = await referralProgram.referralFees(referral)
    const balance = await erc20Mock.balanceOf(referralProgram.address)

    assert(BigInt(balance.toString()) === paymentAmount, 'ERROR::WRONG_REFERRAL_PROGRAM_BALANCE')
    assert(BigInt(accruedFee.toString()) === BigInt(5E18), 'ERROR::WRONG_ACCRUED_REFERRAL_FEE')
  })

  it('should send accrued fee to referral', async () => {
    const erc20Mock = await Erc20Mock.deployed()
    const referralProgram = await ReferralProgram.deployed()

    const referral = accounts[1]

    const accruedFee = await referralProgram.referralFees(referral)
    const balanceBefore = await erc20Mock.balanceOf(referral)

    await referralProgram.claimReferralFee({ from: referral })

    const balanceAfter = await erc20Mock.balanceOf(referral)
    const accruedFeeAfter = await referralProgram.referralFees(referral)

    assert(BigInt(balanceAfter.toString()) - BigInt(balanceBefore.toString()) === BigInt(accruedFee), 'ERROR::WRONG_REFERRAL_BALANCE')
    assert(accruedFeeAfter.toString() === '0', 'ERROR::WRONG_ACCRUED_FEE_AFTER_CLAIM')
  })
})
