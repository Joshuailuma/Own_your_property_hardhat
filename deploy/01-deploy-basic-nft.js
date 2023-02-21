const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")
const { verify } = require("../utils/verify")

const imagesLocation = "./images/"
let tokenUri ="ipfs://QmdAgKuYYxxySakQPpqv6XcTW54WePVZ6TFbQXXz3NrACW" //The uri stored in pinata or incase not uploaded

//The objects we are to deploy on pinata
const metadataTemplate = {
    name: "My glasses",
    description: "Nice glasses",
    "serialNumber":"qsyd746",
    image: "QmdAgKuYYxxySakQPpqv6XcTW54WePVZ6TFbQXXz3NrACW",
}

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
     //To upload images
     if (process.env.UPLOAD_TO_PINATA == "true") {
        tokenUri = await handleTokenUri()
        console.log(tokenUri);

    }

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("--------------1st--------------------------------------")

    const arguments = [] //If there is no constructor, would be empty

    const basicNft = await deploy("BasicNft", { // our deployer arguments
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

      // Verify the deployment
      if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, arguments)
    } else{
        console.log(`Localhost`);
    }
    log("----------------------------------------------------")
}

async function handleTokenUri() {
    
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    for (imageUploadResponseIndex in imageUploadResponses) {
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".jpg", "")
        tokenUriMetadata.description = tokenUriMetadata.name
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
        console.log(`Uploading ${tokenUriMetadata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        console.log(metadataUploadResponse);
        // the image url
        tokenUri = `ipfs://${metadataUploadResponse.IpfsHash}`
    }
    console.log(`Token Uri is ${tokenUri}`)
    return tokenUri
}

module.exports.tags = ["all", "basicnft"]
