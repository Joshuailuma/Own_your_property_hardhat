const networkConfig = {
    
    31337: {
        name: "localhost",
    },
    137:{ 
        name: "polygon",
        ethUsdPriceFeed: "0x5f4eC3df9cbd43714FE2740f5E3616155c5b8419"
    }
}
const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndAbiLocation = "../own-your-property/constants/" 
const frontEndContractsFile = "../own-your-property/constants/networkMapping.json"

module.exports = {frontEndContractsFile, 
    networkConfig, 
    developmentChains,
     VERIFICATION_BLOCK_CONFIRMATIONS,
      frontEndAbiLocation
}