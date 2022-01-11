/**
 * In this script we will fund an escrow contract. The escrow contract
 * ensures the payment is made out(from the escrow) to a specific receiver only.
 * This receiver address is hardcoded in the smart contract, and can be passed
 * dynamically to the contract using fundLsig function (passed as a template parameter)
 */
 async function run(runtimeEnv, deployer) {
    console.log('with argument deploying......!');
  
    await deployer.fundLsig('with-argument.teal',
      { funder: deployer.accounts[0], fundingMicroAlgo: 20e6 }, { fee: 1000 });
    await deployer.mkDelegatedLsig('with-argument.teal', deployer.accounts[0]);
    const withArgument = await deployer.loadLogic('with-argument.teal');
  
    await deployer.addCheckpointKV('User Checkpoint WithArgument', `WithArgument Account: ${withArgument.address()}`);
    console.log(withArgument.address());
    console.log('with-argument deployed!');
  }
  
  module.exports = { default: run };
  