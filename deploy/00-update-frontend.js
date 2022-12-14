const {
    frontEndContractsFile,
    frontEndContractsFile2,
    frontEndAbiLocation,
    frontEndAbiLocation2,
} = require("../helper-hardhat-config")

require("dotenv").config()
const fs = require("fs")
const { network } = require("hardhat") 

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        // await updateAbi()
        console.log("Front end written!")
    } else{
        console.log("Not updating fronend");
    }
}

async function updateAbi() {
    const ownYourProperty = await ethers.getContract("NftMarketplace")
    fs.writeFileSync(
        `${frontEndAbiLocation}NftMarketplace.json`,
        ownYourProperty.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation2}NftMarketplace.json`,
        ownYourProperty.interface.format(ethers.utils.FormatTypes.json)
    )

    const basicNft = await ethers.getContract("BasicNft")
    fs.writeFileSync(
        `${frontEndAbiLocation}BasicNft.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation2}BasicNft.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    //Update contract address object
    const chainId = network.config.chainId.toString() //Localhost is 31337
    const ownYourProperty = await ethers.getContract("OwnYourProperty") //Get the contract
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8")) //Read the networkMapping file in frontend
    //If contractAddress has data alredy
    if (chainId in contractAddresses) { 
        if (!contractAddresses[chainId]["OwnYourProperty"].includes(ownYourProperty.address )) {
            //If there is no address in the file
            contractAddresses[chainId]["OwnYourProperty"].push(ownYourProperty.address) //Include the address
        }
    } else {
        contractAddresses[chainId] = { OwnYourProperty: [ownYourProperty.address] } //Else Put in the file this object
    }//Write to the files
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses)) 
    // fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
