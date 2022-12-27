const { ethers, network } = require("hardhat")

const tokenUri ="ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo"


async function mintBasicNft() {
    accounts = await ethers.getSigners()
    const deployer = accounts[0] //deployer

    // const basicNftContract = await ethers.getContract("BasicNft", deployer)

//    const contractFactory = await ethers.getContractFactory("BasicNft", deployer)

   const deployedContract = await ethers.getContract("BasicNft") //Get the contract
//    const argument = [tokenUri] 
   
//    const deployedContract = await contractFactory.deploy({ // our deployer arguments
//     from: deployer,
//     args: argument,
//     log: true})
    
    // await deployedContract.deployed()
    console.log(deployedContract)
    console.log("Contract address is...");
    console.log(deployedContract.address);



    console.log("Minting NFT........");
    //Directly pass in token uri into mintNft Function.
   // We previously passed it in from the contructor
    const tokenUri = await deployedContract.getTokenUri(0)

    // const emitS = mintedProperty.emit(deployedContract, "PropertyMinted")
    // console.log(`Emmitng ${emitS}`);
    console.log("====Result======");
    

    console.log(tokenUri);


    
}

mintBasicNft()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })