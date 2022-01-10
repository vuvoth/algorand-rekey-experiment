
const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const masterAccount = deployer.accountsByName.get('master');

    const bob = deployer.accountsByName.get('bob');
    const lsig = await deployer.loadLogic('alway-true.teal');

    const txParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        fromAccountAddr: masterAccount.addr,
        toAccountAddr: bob.addr,
        amountMicroAlgos: 1000n, // amt < 100
        lsig: lsig,
        payFlags: {
            totalFee: 1000,
        }
    }


    await executeTransaction(deployer, txParams);
}

module.exports = {
    default: run
}