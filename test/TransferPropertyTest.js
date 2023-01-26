const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Nft Marketplace Unit Tests", function () {
      let connection,
        transferPropertyContract,
        basicNftContract,
        deployer,
        player;
      const PRICE = ethers.utils.parseEther("0.1");
      const TOKEN_ID = 1;

      beforeEach(async () => {
        accounts = await ethers.getSigners(); // could also do with getNamedAccounts
        deployer = accounts[0]; //deployer
        player = accounts[1]; //Player or secod person
        await deployments.fixture(["all"]);
        // The deployer is currently the default unless changed to player using transferProperty.connect(player)
        transferPropertyContract = await ethers.getContract("TransferProperty");
        basicNftContract = await ethers.getContract("BasicNft");
        // Store a property
        await basicNftContract.mintNft("ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo");
        // Approve the property for transfer
        await basicNftContract.approve(
          transferPropertyContract.address,
          TOKEN_ID
        );
      });

      it("Transfer token", async function () {
        const prevOwner = await basicNftContract.ownerOf(TOKEN_ID); // Check the current owner of the property
        console.log(prevOwner);
        //Transfer the item
        await transferPropertyContract.transferItem(
          basicNftContract.address,
          TOKEN_ID,
          player.address
        );
        // Check the new owner of the property
        const newOwner = await basicNftContract.ownerOf(TOKEN_ID);
        console.log(newOwner);
        assert(newOwner.toString() == player.address.toString());
        // console.log("-----Contract Owners address----------");
        // console.log(ownwerProperty.address);
        // console.log("-----Account 0----------");

        // const buyerNft = ownYourPropertyContract.connect(player)
        // console.log(deployer.address);
        // console.log("------Account 1------------------");
        // console.log(player.address);
        // console.log("------BasicContract NFT address----------------");
        // console.log(basicNftContract.address);
        // console.log("------NFT Buyer----------------");
        // console.log(buyerNft.address);

        // await ownYourPropertyContract.transferItem(basicNftContract.address. TOKEN_ID, )
      });
    });
