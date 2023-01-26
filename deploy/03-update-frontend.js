//If we want the result to make changes to our front end
const {
  frontEndContractsFile,
  frontEndContractsFile2,
  frontEndAbiLocation,
  frontEndAbiLocation2,
} = require("../helper-hardhat-config");

require("dotenv").config();
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end...");
    // Uncommment below if you want result to make changes to frontend
    // await updateContractAddresses();
    // await updateAbi();
    console.log("Front end written!");
  } else {
    console.log("Not updating fronend");
  }
};

// This sends the abi of our contract to the front end
async function updateAbi() {
  const transferProperty = await ethers.getContract("TransferProperty");
  fs.writeFileSync(
    `${frontEndAbiLocation}TransferProperty.json`,
    transferProperty.interface.format(ethers.utils.FormatTypes.json)
  );

  const basicNft = await ethers.getContract("BasicNft");
  fs.writeFileSync(
    `${frontEndAbiLocation}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  //Update contract address object
  const chainId = network.config.chainId.toString(); //Localhost is 31337
  console.log(`GOt chain id ${chainId}`);
  const transferProperty = await ethers.getContract("TransferProperty"); //Get the contract
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  ); //Read the networkMapping file in frontend
  //If contractAddress has data alredy
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]["TransferProperty"].includes(
        transferProperty.address
      )
    ) {
      //If there is no address in the file
      contractAddresses[chainId]["TransferProperty"].push(
        transferProperty.address
      ); //Include the address
    }
  } else {
    contractAddresses[chainId] = {
      TransferProperty: [transferProperty.address],
    }; //Else Put in the file this object
  } //Write to the files
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
  // fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"];
