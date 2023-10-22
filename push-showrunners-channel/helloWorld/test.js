const Web3 = require('web3')

const tokenMessengerAbi = require('./abis/cctp/TokenMessenger.json');
const messageAbi = require('./abis/cctp/Message.json');
const usdcAbi = require('./abis/Usdc.json');
const messageTransmitterAbi = require('./abis/cctp/MessageTransmitter.json');
require("dotenv").config();
const waitForTransaction = async(web3, txHash) => {
    let transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
    while(transactionReceipt != null && transactionReceipt.status === 'FALSE') {
        transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        await new Promise(r => setTimeout(r, 4000));
    }
    return transactionReceipt;
}
const ETH_TESTNET_RPC = "https://eth-goerli.g.alchemy.com/v2/7uEvws3soc7TZgTUvZNoBB72fxT_IR-2";
const ETH_PRIVATE_KEY = '0x1b4ef2764fb0b762512aca9558a76db21db34c80b549e782e4ef8018a831dce2';
async function main(){
    try{
    //console.log(process.env)
    const web3 = new Web3(ETH_TESTNET_RPC);
// Add ETH private key used for signing transactions
const ethSigner = web3.eth.accounts.privateKeyToAccount(ETH_PRIVATE_KEY);
web3.eth.accounts.wallet.add(ethSigner);

// Add AVAX private key used for signing transactions
/* const avaxSigner = web3.eth.accounts.privateKeyToAccount(AVAX_PRIVATE_KEY);
web3.eth.accounts.wallet.add(avaxSigner); */

// Testnet Contract Addresses
const ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS = "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8";
const USDC_ETH_CONTRACT_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
// const ETH_MESSAGE_CONTRACT_ADDRESS = "0x26413e8157cd32011e726065a5462e97dd4d03d9"
const ETH_MESSAGE_CONTRACT_ADDRESS = "0x1a9695e9dbdb443f4b20e3e4ce87c8d963fda34f"

const AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS = '0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79';

// initialize contracts using address and ABI
console.log(ethSigner.address)
const ethTokenMessengerContract = new web3.eth.Contract(tokenMessengerAbi, ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, {from: ethSigner.address});
const usdcEthContract = new web3.eth.Contract(usdcAbi, USDC_ETH_CONTRACT_ADDRESS, {from: ethSigner.address});
const ethMessageContract = new web3.eth.Contract(messageAbi, ETH_MESSAGE_CONTRACT_ADDRESS, {from: ethSigner.address});
const avaxMessageTransmitterContract = new web3.eth.Contract(messageTransmitterAbi, AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS, {from: ethSigner.address});

// AVAX destination address
const mintRecipient = '0xA85CCf0862131b38A898a3afE860797dCBfc08FD';
const destinationAddressInBytes32 = await ethMessageContract.methods.addressToBytes32(mintRecipient).call();
//console.log(ethSigner.address)
const AVAX_DESTINATION_DOMAIN = 1;

// Amount that will be transferred
const amount = 1000;

// STEP 1: Approve messenger contract to withdraw from our active eth address
const approveTxGas = await usdcEthContract.methods.approve(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, amount).estimateGas()
const approveTx = await usdcEthContract.methods.approve(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, amount).send({gas: approveTxGas})
const approveTxReceipt = await waitForTransaction(web3, approveTx.transactionHash);
console.log('ApproveTxReceipt: ', approveTxReceipt)

// STEP 2: Burn USDC
const burnTxGas = await ethTokenMessengerContract.methods.depositForBurn(amount, AVAX_DESTINATION_DOMAIN, destinationAddressInBytes32, USDC_ETH_CONTRACT_ADDRESS).estimateGas();
const burnTx = await ethTokenMessengerContract.methods.depositForBurn(amount, AVAX_DESTINATION_DOMAIN, destinationAddressInBytes32, USDC_ETH_CONTRACT_ADDRESS).send({gas: burnTxGas});
const burnTxReceipt = await waitForTransaction(web3, burnTx.transactionHash);
console.log('BurnTxReceipt: ', burnTxReceipt)

// STEP 3: Retrieve message bytes from logs
const transactionReceipt = await web3.eth.getTransactionReceipt(burnTx.transactionHash);
const eventTopic = web3.utils.keccak256('MessageSent(bytes)')
const log = transactionReceipt.logs.find((l) => l.topics[0] === eventTopic)
const messageBytes = web3.eth.abi.decodeParameters(['bytes'], log.data)[0]
const messageHash = web3.utils.keccak256(messageBytes);

console.log(`MessageBytes: ${messageBytes}`)
console.log(`MessageHash: ${messageHash}`)

// STEP 4: Fetch attestation signature
let attestationResponse = {status: 'pending'};
while(attestationResponse.status != 'complete') {
    const response = await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageHash}`);
    attestationResponse = await response.json()
    await new Promise(r => setTimeout(r, 2000));
}

const attestationSignature = attestationResponse.attestation;
console.log(`Signature: ${attestationSignature}`)

const AVAX_TESTNET_RPC = "https://spring-little-pond.avalanche-testnet.quiknode.pro/f976fd4a6d7d02404868227d642b262be066a08b/ext/bc/C/rpc/"
// STEP 5: Using the message bytes and signature recieve the funds on destination chain and address
web3.setProvider(AVAX_TESTNET_RPC); // Connect web3 to AVAX testnet
const receiveTxGas = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).estimateGas();
const receiveTx = await avaxMessageTransmitterContract.methods.receiveMessage(messageBytes, attestationSignature).send({gas: receiveTxGas});
const receiveTxReceipt = await waitForTransaction(web3, receiveTx.transactionHash);
console.log('ReceiveTxReceipt: ', receiveTxReceipt)
    }catch(e){
        console.log(e)
    }
}
main();