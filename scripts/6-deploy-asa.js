/**
 * In this script we will fund an escrow contract. The escrow contract
 * ensures the payment is made out(from the escrow) to a specific receiver only.
 * This receiver address is hardcoded in the smart contract, and can be passed
 * dynamically to the contract using fundLsig function (passed as a template parameter)
 */
async function run(runtimeEnv, deployer) {
   const asaInfo = await deployer.deployASA("E21", {
      creator: deployer.accounts[0]
   });
   

   deployer.registerASAInfo('E21', asaInfo);
}

module.exports = { default: run };
