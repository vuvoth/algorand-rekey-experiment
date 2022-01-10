
const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const masterAccount = deployer.accountsByName.get('master');

    const lsig = await deployer.loadLogic('alway-true.teal');

    const txParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.SecretKey, 
        fromAccount: masterAccount, 
        toAccountAddr: masterAccount.addr,
        amountMicroAlgos: 0n,
        payFlags: {
            totalFee: 1000, 
            rekeyTo: lsig.address()
        }
    }

    await executeTransaction(deployer, txParams);
}

module.exports = {
    default: run
}