// Do Scheduling
// https://github.com/node-schedule/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// Execute a cron job every 5 Minutes = */5 * * * *
// Starts from seconds = * * * * * *

import config from "../../config";
import logger from "../../loaders/logger";
import { ethers } from "ethers";
import { Container } from "typedi";
import schedule from "node-schedule";
import HelloWorldChannel from "./helloWorldChannel";
import { abi } from "./abi";
import { ChainId } from "caip";
export default () => {
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));

  const fiveMinuteRule = new schedule.RecurrenceRule();

  fiveMinuteRule.minute = 1;

  const channel = Container.get(HelloWorldChannel);
  channel.logInfo(
    ` 🛵 Scheduling Showrunner - ${channel.cSettings.name} Channel`
  );

  schedule.scheduleJob("", async function () {
    const taskName = `${channel.cSettings.name} event checks and helloWorld`;

    try {
      function main() {
        channel.logInfo("Sending notification to evidence provider");
        const contract_address = "0xeA6BF9a6e31ca94e2866219E74EEAa12a8347917";
        const provider = new ethers.providers.WebSocketProvider(
          `wss://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`
        );
        const contract = new ethers.Contract(contract_address, abi, provider);
        contract.on("sendNotification", (a1, a2, _safeId, amt) => {
          // Initialized the widthrawl transaction
          let info = {
            address1: a1,
            address2: a2,
            safeId: _safeId,
            amount: amt,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.widthrawRequest(info);
        });
        contract.on("safeCreated", (a1, a2, _safeId, amt) => {
          // Initialized the widthrawl transaction
          let info = {
            address1: a1,
            address2: a2,
            safeId: _safeId,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.widthrawRequest(info);
        });
        contract.on("signedTransaction", (a1, a2, _safeId) => {
          // Initialized the widthrawl transaction
          let info = {
            address1: a1,
            address2: a2,
            safeId: _safeId,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.signedTransaction(info);
        });
        contract.on("fundsAdded", (a1, a2, _safeId, amt) => {
          // Initialized the widthrawl transaction
          let info = {
            address1: a1,
            address2: a2,
            safeId: _safeId,
            amount: amt,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.fundsAdded(info);
        });
        contract.on("widthrawMoney", (balance, receiver, _safeId, chainId) => {
          //for cross chain widthrawal
          let info = {
            balance: balance,
            receiver: receiver,
            safeId: _safeId,
            chainId: chainId,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.widthrawCrossChain(info);
        });
        contract.on("moneyWidthrawn", (balance, receiver, _safeId, chainId) => {
          // Successful money widthrawl on poly
          let info = {
            balance: balance,
            receiver: receiver,
            safeId: _safeId,
            chainId: chainId,
          };
          channel.logError(`Info is ${JSON.stringify(info)}`);
          channel.widthrawSameChain(info);
        });
      }
      main();
      //await channel.helloWorld(false);

      channel.logInfo(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      channel.logInfo(`❌ Cron Task Failed -- ${taskName}`);
      channel.logError(`Error Object: %o`);
      channel.logError(err);
    }
  });
};
