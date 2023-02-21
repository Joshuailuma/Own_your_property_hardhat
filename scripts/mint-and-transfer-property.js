const { ethers, network } = require("hardhat");
const { localhost } = require("../hardhat.config")

async function mintAndTransfer() {
  const transferPropertyContract = await ethers.getContract("TransferProperty");
  const basicNftContract = await ethers.getContract("BasicNft");
  accounts = await ethers.getSigners(); // could also do with getNamedAccounts
  deployer = accounts[0]; //deployer
  player = accounts[1]; //Player
  console.log("Minting NFT...");
  const mintTx = await basicNftContract.mintNft("ipfs://QmdAgKuYYxxySakQPpqv6XcTW54WePVZ6TFbQXXz3NrACW");
  const mintTxReceipt = await mintTx.wait(1);
  // When that thing above emits an event from the smartcontract
  const tokenId = mintTxReceipt.events[0].args.tokenId;
  console.log("Approving or taking the NFT");
  const approvalTx = await basicNftContract.approve(
    transferPropertyContract.address,
    tokenId
  );
  await approvalTx.wait(1);
  console.log("Transferring the NFT");
  console.log(`Property address is ${basicNftContract.address}`);
  console.log(`Token id is ${tokenId}`);
  console.log(`Initial owner address is ${deployer.address}`);
  console.log(`Future ownwer address is ${player.address}`);

 const result= await transferPropertyContract.transferItem(
    basicNftContract.address,
    tokenId,
    player.address
  );
  console.log(result);
}


mintAndTransfer()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
