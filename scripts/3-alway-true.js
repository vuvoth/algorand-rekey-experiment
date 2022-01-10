/**
 * In this script we will fund an escrow contract. The escrow contract
 * ensures the payment is made out(from the escrow) to a specific receiver only.
 * This receiver address is hardcoded in the smart contract, and can be passed
 * dynamically to the contract using fundLsig function (passed as a template parameter)
 */
async function run(runtimeEnv, deployer) {
  console.log('Alway true deploying......!');

  await deployer.fundLsig('alway-true.teal',
    { funder: deployer.accounts[0], fundingMicroAlgo: 20e6 }, { fee: 1000 });
  await deployer.mkDelegatedLsig('alway-true.teal', deployer.accounts[0]);
  const alwayTrue = await deployer.loadLogic('alway-true.teal');

  await deployer.addCheckpointKV('User Checkpoint AlwayTrue', `Fund AlwayTrue Account: ${alwayTrue.address()}`);
  console.log(alwayTrue.address());
  console.log('Alway true deployed!');
}

module.exports = { default: run };
