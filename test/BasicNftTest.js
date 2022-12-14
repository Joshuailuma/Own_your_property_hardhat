// We are going to skip a bit on these tests...

const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const tokenUri ="ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo" //The uri stored in pinata or incae not uploaded

//writing the test code from here..

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          let basicNft, deployer, contractFactory
        //   const arguments = [tokenUri] //If there is no constructor, would be empty

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNft", deployer)
              

            //   await basicNft.deployTransaction(
            //     {
            //     from: deployer,
            //     args: arguments
            // }
            // )
          })

          describe("constructor", () => {
            it("sets starting values correctly", async function () {
                const tokenUri = await basicNft.getTokenUri()
                const isInitialized = await basicNft.getInitialized()
                assert(tokenUri.includes("ipfs://QmaVkBn2tKmjbhphU7"))
                assert.equal(isInitialized, true)
            })
        })


        describe("mint", () => {
            it("possible to mint", async function () {
                contractFactory = await ethers.getContractFactory("BasicNft")
                const argument = [tokenUri] //If there is no constructor, would be empty
              const deployedContract = await contractFactory.deploy({ // our deployer arguments
                from: deployer,
                args: argument})

              await deployedContract.deployed()
              const token = await basicNft.mintNft()


                // See if event will be emmited
                await expect(deployedContract.mintNft()).to.emit(deployedContract, "PropertyMinted").withArgs("1", deployer, basicNft.address)
                const tokenCounter = await basicNft.getTokenCounter()
                assert.equal(tokenCounter.toString(), "1")
            })
        })
    

        })