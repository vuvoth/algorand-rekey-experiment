/**
 * In this script we will fund an escrow contract. The escrow contract
 * ensures the payment is made out(from the escrow) to a specific receiver only.
 * This receiver address is hardcoded in the smart contract, and can be passed
 * dynamically to the contract using fundLsig function (passed as a template parameter)
 */
async function run(runtimeEnv, deployer) {
  console.log('another true deploying......!');

  await deployer.fundLsig('another-true.teal',
    { funder: deployer.accounts[0], fundingMicroAlgo: 20e6 }, { fee: 1000 });
  await deployer.mkDelegatedLsig('another-true.teal', deployer.accounts[0]);
  const anotherTrue = await deployer.loadLogic('another-true.teal');

  await deployer.addCheckpointKV('User Checkpoint AnotherTrue', `Fund AnotherTrue Account: ${anotherTrue.address()}`);
  console.log(anotherTrue.address());
  console.log('another true deployed!');
}

module.exports = { default: run };
