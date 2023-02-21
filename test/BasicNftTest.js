const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const tokenUri ="ipfs://QmdAgKuYYxxySakQPpqv6XcTW54WePVZ6TFbQXXz3NrACW" //The uri stored in pinata or incase not uploaded

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          let basicNft, deployer, contractFactory
        //   const arguments = [tokenUri] //If there is no constructor, would be empty
        // This will run before each test/"it()"
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNft", deployer)
          })

          describe("store property", () => {
            it("possible to mint", async function () {
                contractFactory = await ethers.getContractFactory("BasicNft")
                // const argument = [] //If there is no constructor, would be empty
              // const deployedContract = await contractFactory.deploy({ // our deployer arguments
              //   from: deployer,
              //   args: argument})
              //   console.log("deployed");

              await basicNft.deployed()

                // See if event emitted matches what we want it to emit
                await expect(basicNft.mintNft(tokenUri)).to.emit(basicNft, "PropertyMinted").withArgs("1", deployer.address, basicNft.address)
                // Check if tokenCounter will increase
                const tokenCounter = await basicNft.getTokenCounter()
                assert.equal(tokenCounter.toString(), "1")
            })


            it("If token uri stored in Blockchain is what we assigned to it", async function () {
              await basicNft.deployed()
              const storedProperty = await basicNft.mintNft(tokenUri) //Store the property
              storedProperty.wait()
              // See If token uri stored in Blockchain is what we assigned to it
                const tokenUriFromBlockchain = await basicNft.getTokenUri(1)
                assert(tokenUriFromBlockchain.includes("ipfs://QmaVkBn2tKmjbhphU7"))
            })
        })
        })