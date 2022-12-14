const { ethers, network } = require("hardhat")
// const { moveBlocks } = require("../utils/move-blocks")


async function mintAndTransfer() {
    const ownYourPropertyContract = await ethers.getContract("OwnYourProperty")
    const basicNftContract = await ethers.getContract("BasicNft")
    accounts = await ethers.getSigners() // could also do with getNamedAccounts
    deployer = accounts[0] //deployer
    player = accounts[1] //Player 
    console.log("Minting NFT...")
    const mintTx = await basicNftContract.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    // When that thing above emits an event from the smartcontract
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving or taking the NFT");
    const approvalTx = await basicNftContract.approve(ownYourPropertyContract.address, tokenId)
    await approvalTx.wait(1)
    console.log("Transferring the NFT");
    await ownYourPropertyContract.transferItem(basicNftContract.address, tokenId, player.address)
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
mintAndTransfer()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

  