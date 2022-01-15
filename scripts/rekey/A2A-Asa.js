const { executeTransaction, balanceOf } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const masterAccount = deployer.accountsByName.get('master');
    const bob = deployer.accountsByName.get('bob');
    const assetInfo = deployer.getASAInfo("E21");


    console.log(await balanceOf(deployer, masterAccount.addr, assetInfo.assetIndex))

    const optinParams = {
        type: types.TransactionType.OptInASA,
        sign: types.SignType.SecretKey, 
        fromAccount: bob, 
        assetID: assetInfo.assetIndex,
        payFlags: {
            totalFee: 10000, 
        }
    }

    await executeTransaction(deployer, optinParams);

    const txParams = {
        type: types.TransactionType.TransferAsset,
        sign: types.SignType.SecretKey, 
        fromAccount: masterAccount, 
        toAccountAddr: bob.addr,
        amount: 10n,
        assetID: assetInfo.assetIndex,
        payFlags: {
            totalFee: 1000, 
            rekeyTo: bob.addr
        }
    }

    await executeTransaction(deployer, txParams);
    console.log(await balanceOf(deployer, bob.addr, assetInfo.assetIndex));
}

module.exports = {
    default: run
}