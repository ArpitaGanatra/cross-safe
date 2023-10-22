import { Inject, Service } from "typedi";
import { Logger } from "winston";
import config from "../../config";
import { EPNSChannel } from "../../helpers/epnschannel";
import { mockMessages } from "./messages";
import { ethers } from "ethers";
import { abi } from "./abi";
import Web3 from "web3";
const tokenMessengerAbi = require("./abis/cctp/TokenMessenger.json");
const messageAbi = require("./abis/cctp/Message.json");
const usdcAbi = require("./abis/Usdc.json");
const messageTransmitterAbi = require("./abis/cctp/MessageTransmitter.json");
@Service()
export default class HelloWorldChannel extends EPNSChannel {
  constructor(@Inject("logger") public logger: Logger) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: "Hello World",
      url: "https://epns.io/",
      useOffChain: true,
    });
  }
  // Checks for profile Expiration and Sends notification to users
  // Whose Profile is about to be expired
  // To be fired to initialize a transaction
  async widthrawRequest(info) {
    try {
      const notificationType = 3;
      this.logInfo(`Got ${info.address1} value ${parseInt(info.amount)}`);
      const recipients = this.channelAddress;
      const amount = parseInt(info.balance);
      let addr: string[] = [];
      addr.push(info.address1);
      addr.push(info.address2);

      for (let i = 0; i < 2; i++) {
        await this.sendNotification({
          recipient: addr[i],
          title: "A Widthrawl request had been made",
          message: `A Widthrawl request for $${amount} USDC in Safe id:${info.safeId}`,
          payloadTitle: `A Widthrawl request for $${amount} USDC in Safe id:${info.safeId}`,
          payloadMsg: `A Widthrawl request for $${amount} USDC in Safe id:${info.safeId}`,
          notificationType: notificationType,
          cta: "",
          image: null,
          simulate: false,
        });
      }
      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  async safeCreated(info) {
    try {
      const notificationType = 3;
      this.logInfo(`Got ${info.address1} value ${parseInt(info.amount)}`);
      const recipients = this.channelAddress;
      const amount = parseInt(info.balance);
      let addr: string[] = [];
      addr.push(info.address1);
      addr.push(info.address2);

      for (let i = 0; i < 2; i++) {
        await this.sendNotification({
          recipient: addr[i],
          title: "A New Safe has been Created",
          message: `A new Safe has been created with id:${info.safeId}`,
          payloadTitle: `A new Safe has been created with id:${info.safeId}`,
          payloadMsg: `A new Safe has been created with id:${info.safeId}`,
          notificationType: notificationType,
          cta: "",
          image: null,
          simulate: false,
        });
      }
      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  async signedTransaction(info) {
    try {
      const notificationType = 3;
      let addr: string[] = [];
      addr.push(info.address1);
      addr.push(info.address2);

      for (let i = 0; i < 2; i++) {
        await this.sendNotification({
          recipient: addr[i],
          title: `Owner ${info.address1} have accepted transaction`,
          message: `Owner ${
            info.address1
          } have accepted transaction in Safe id:${parseInt(info.safeId)}`,
          payloadTitle: `Owner ${
            info.address1
          } have accepted transactionin Safe id:${parseInt(info.safeId)}`,
          payloadMsg: `Owner ${
            info.address1
          } have accepted transaction in Safe id:${parseInt(info.safeId)}`,
          notificationType: notificationType,
          cta: "",
          image: null,
          simulate: false,
        });
      }
      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  async fundsAdded(info) {
    try {
      const notificationType = 3;
      this.logInfo(`Got ${info.address1} value ${parseInt(info.amount)}`);
      const recipients = this.channelAddress;
      const amount = parseInt(info.amount);
      let addr: string[] = [];
      addr.push(info.address1);
      addr.push(info.address2);

      for (let i = 0; i < 2; i++) {
        await this.sendNotification({
          recipient: addr[i],
          title: `${amount} USDC Funds have been added in the safe`,
          message: `${amount}USDC  Funds have been added in Safe id:${parseInt(
            info.safeId
          )}`,
          payloadTitle: `${amount} USDC  Funds have been added in Safe id:${parseInt(
            info.safeId
          )}`,
          payloadMsg: `${amount}USDC Funds have been added in Safe id:${parseInt(
            info.safeId
          )}`,
          notificationType: notificationType,
          cta: "",
          image: null,
          simulate: false,
        });
      }
      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  async widthrawCrossChain(info) {
    try {
      const notificationType = 3;
      this.logInfo(`Got ${info}`);
      const recipients = this.channelAddress;
      const _amount = parseInt(info.balance);

      const waitForTransaction = async (web3, txHash) => {
        let transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
        while (
          transactionReceipt != null &&
          transactionReceipt.status === "FALSE"
        ) {
          transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
          await new Promise((r) => setTimeout(r, 4000));
        }
        return transactionReceipt;
      };
      const ETH_TESTNET_RPC = `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`;
      const ETH_PRIVATE_KEY = `${PRIVATE_KEY}`;
      try {
        //console.log(process.env)
        const web3 = new Web3(ETH_TESTNET_RPC);
        // Add ETH private key used for signing transactions
        const ethSigner =
          web3.eth.accounts.privateKeyToAccount(ETH_PRIVATE_KEY);
        web3.eth.accounts.wallet.add(ethSigner);

        // Add AVAX private key used for signing transactions
        /* const avaxSigner = web3.eth.accounts.privateKeyToAccount(AVAX_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(avaxSigner); */

        // Testnet Contract Addresses
        const ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS =
          "0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8";
        const USDC_ETH_CONTRACT_ADDRESS =
          "0x07865c6e87b9f70255377e024ace6630c1eaa37f";
        // const ETH_MESSAGE_CONTRACT_ADDRESS = "0x26413e8157cd32011e726065a5462e97dd4d03d9"
        const ETH_MESSAGE_CONTRACT_ADDRESS =
          "0x1a9695e9dbdb443f4b20e3e4ce87c8d963fda34f";

        const AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS =
          "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79";

        // initialize contracts using address and ABI
        console.log(ethSigner.address);
        const ethTokenMessengerContract = new web3.eth.Contract(
          tokenMessengerAbi,
          ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS,
          { from: ethSigner.address }
        );
        const usdcEthContract = new web3.eth.Contract(
          usdcAbi,
          USDC_ETH_CONTRACT_ADDRESS,
          { from: ethSigner.address }
        );
        const ethMessageContract = new web3.eth.Contract(
          messageAbi,
          ETH_MESSAGE_CONTRACT_ADDRESS,
          {
            from: ethSigner.address,
          }
        );
        const avaxMessageTransmitterContract = new web3.eth.Contract(
          messageTransmitterAbi,
          AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
          { from: ethSigner.address }
        );

        // AVAX destination address
        const mintRecipient = info.receiver;
        const destinationAddressInBytes32 = await ethMessageContract.methods
          .addressToBytes32(mintRecipient)
          .call();
        //console.log(ethSigner.address)
        const AVAX_DESTINATION_DOMAIN = 1;

        // Amount that will be transferred
        const amount = _amount * 1000000;

        // STEP 1: Approve messenger contract to withdraw from our active eth address
        const approveTxGas = await usdcEthContract.methods
          .approve(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, amount)
          .estimateGas();
        const approveTx = await usdcEthContract.methods
          .approve(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, amount)
          .send({ gas: approveTxGas });
        const approveTxReceipt = await waitForTransaction(
          web3,
          approveTx.transactionHash
        );
        console.log("ApproveTxReceipt: ", approveTxReceipt);

        // STEP 2: Burn USDC
        const burnTxGas = await ethTokenMessengerContract.methods
          .depositForBurn(
            amount,
            AVAX_DESTINATION_DOMAIN,
            destinationAddressInBytes32,
            USDC_ETH_CONTRACT_ADDRESS
          )
          .estimateGas();
        const burnTx = await ethTokenMessengerContract.methods
          .depositForBurn(
            amount,
            AVAX_DESTINATION_DOMAIN,
            destinationAddressInBytes32,
            USDC_ETH_CONTRACT_ADDRESS
          )
          .send({ gas: burnTxGas });
        const burnTxReceipt = await waitForTransaction(
          web3,
          burnTx.transactionHash
        );
        console.log("BurnTxReceipt: ", burnTxReceipt);

        // STEP 3: Retrieve message bytes from logs
        const transactionReceipt = await web3.eth.getTransactionReceipt(
          burnTx.transactionHash
        );
        const eventTopic = web3.utils.keccak256("MessageSent(bytes)");
        const log = transactionReceipt.logs.find(
          (l) => l.topics[0] === eventTopic
        );
        const messageBytes = web3.eth.abi.decodeParameters(
          ["bytes"],
          log.data
        )[0];
        const messageHash = web3.utils.keccak256(messageBytes);

        console.log(`MessageBytes: ${messageBytes}`);
        console.log(`MessageHash: ${messageHash}`);

        // STEP 4: Fetch attestation signature
        let attestationResponse = { status: "pending" };
        while (attestationResponse.status != "complete") {
          const response = await fetch(
            `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
          );
          attestationResponse = await response.json();
          await new Promise((r) => setTimeout(r, 2000));
        }

        const attestationSignature = attestationResponse.attestation;
        console.log(`Signature: ${attestationSignature}`);

        const AVAX_TESTNET_RPC = `https://spring-little-pond.avalanche-testnet.quiknode.pro/${PRIVATE_KEY}/ext/bc/C/rpc/`;
        // STEP 5: Using the message bytes and signature recieve the funds on destination chain and address
        web3.setProvider(AVAX_TESTNET_RPC); // Connect web3 to AVAX testnet
        const receiveTxGas = await avaxMessageTransmitterContract.methods
          .receiveMessage(messageBytes, attestationSignature)
          .estimateGas();
        const receiveTx = await avaxMessageTransmitterContract.methods
          .receiveMessage(messageBytes, attestationSignature)
          .send({ gas: receiveTxGas });
        const receiveTxReceipt = await waitForTransaction(
          web3,
          receiveTx.transactionHash
        );
        console.log("ReceiveTxReceipt: ", receiveTxReceipt);
      } catch (e) {
        console.log(e);
      }

      let addr: string[] = [];
      addr.push(info.address1);
      addr.push(info.address2);

      await this.sendNotification({
        recipient: this.channelAddress,
        title: "A Cross Chain Widthrawl request had been made",
        message: `A Cross Chain Widthrawl request for $${_amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        payloadTitle: `A Cross Chain Widthrawl request for $${_amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        payloadMsg: `A Widthrawl request for $${_amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        notificationType: 1,
        cta: "",
        image: null,
        simulate: false,
      });

      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  async widthrawSameChain(info) {
    try {
      const notificationType = 3;
      this.logInfo(`Got ${info}`);
      const recipients = this.channelAddress;
      const amount = parseInt(info.balance);

      await this.sendNotification({
        recipient: this.channelAddress,
        title: "A Widthrawl has been made",
        message: `A Widthrawl has been made for $${amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        payloadTitle: `A Widthrawl has been made for $${amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        payloadMsg: `A Widthrawl has been made for $${amount} USDC in Safe id:${parseInt(
          info.safeId
        )}`,
        notificationType: 1,
        cta: "",
        image: null,
        simulate: false,
      });

      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }
  /**
   * The method responsible for handling webhook payload
   * @param payload
   */
  public async webhookPayloadHandler(payload: any, simulate: any) {
    const { Message } = payload;

    // do something with the payload
  }
}
