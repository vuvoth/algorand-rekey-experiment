
const { executeTransaction } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const masterAccount = deployer.accountsByName.get('master');

    const lsig = await deployer.loadLogic('alway-true.teal');

    const txParams = {
        type: types.TransactionType.TransferAlgo,
        sign: types.SignType.LogicSignature,
        fromAccountAddr: lsig.address(),
        toAccountAddr: masterAccount.addr,
        amountMicroAlgos: 0n, // amt < 100
        lsig: lsig,
        payFlags: {
            totalFee: 1000,
            rekeyTo: masterAccount.addr
        }
    }


    await executeTransaction(deployer, txParams);
}

module.exports = {
    default: run
}