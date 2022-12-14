const { ethers, network } = require("hardhat")

const tokenUri ="ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"


async function mintBasicNft() {
    accounts = await ethers.getSigners()
    const deployer = accounts[0] //deployer

    const basicNftContract = await ethers.getContract("BasicNft", deployer)

   const contractFactory = await ethers.getContractFactory("BasicNft")

   const argument = [tokenUri] 
   
   const deployedContract = await contractFactory.deploy({ // our deployer arguments
    from: deployer,
    args: argument})

    await deployedContract.deployed()
    console.log("Minting NFT........");

    const mintedProperty = await deployedContract.mintNft()

    // const emitS = mintedProperty.emit(deployedContract, "PropertyMinted")
    // console.log(`Emmitng ${emitS}`);

    const mintTxReceipt = await mintedProperty.wait(1)


    // When that thing above emits an event from the smartcontract
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving or taking the NFT");
    console.log(tokenId);
}

mintBasicNft()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })