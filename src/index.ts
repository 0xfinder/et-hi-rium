import { BytesLike, ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const { WEB3_INFURA_PROJECT_ID, PRIVATE_KEY } = process.env;

(async () => {
    const connection = new ethers.providers.InfuraProvider(
        "rinkeby",
        WEB3_INFURA_PROJECT_ID,
    );

    const gasPrice = await connection.getGasPrice();
    const wallet = new ethers.Wallet(PRIVATE_KEY as BytesLike);
    const signer = wallet.connect(connection);

    console.log(`Wallet: ${wallet.address}`);
    console.log(`Gas Price: ${gasPrice}`);

    const recipient = "0x00000000003a2e68e6fd8725516341d647fed118";

    const tx = {
        from: wallet.address,
        to: recipient,
        value: ethers.utils.parseUnits("0.1", "ether"),
        gasPrice,
        gasLimit: ethers.utils.hexlify(100000), // 100 gwei
        nonce: await connection.getTransactionCount(wallet.address),
    } as ethers.providers.TransactionRequest;

    const transaction = await signer.sendTransaction(tx);

    console.log(transaction);
})();
