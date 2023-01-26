# Own Your Property(OYP) Hardhat project

This Hardhat project demonstrates the use of smart contract to own your properties and transfer them to buyers when it is physically sold. It contains the smart contract for the decentralized application [`Own Your Property(OYP)`](https://github.com/Joshuailuma/Own-Your-Property-Next-JS)

The contract is deployed to the Goerli Testnet with addresses [0xF74EBb7bB8883E22a8Be30F8C2EDaF7f4B58f360](https://goerli.etherscan.io/address/0xF74EBb7bB8883E22a8Be30F8C2EDaF7f4B58f360) that facilitates storage of properties and [0xB2a74AcbbB57D2ceD305724a5e6b2c5c03F453f3] that facilites transfer of properties (https://goerli.etherscan.io/address/0xB2a74AcbbB57D2ceD305724a5e6b2c5c03F453f3)

## Getting started

- Have node installed in your computer. Refer to https://nodejs.org/

- Install yarn `npm install --global yarn`

- Compile the project `yarn hardhat compile`

- To start a local node `yarn hardhat node`

- To run unit tests `yarn test`

- To deploy to local blockchain `yarn hardhat run scripts/deploy.js`

- To run the scripts `yarn hardhat run/scripts/scriptname --network locahost` e.g `yarn hardhat run/scripts/mint-and-transfer-property --network locahost`

See [hardhat docs](https://hardhat.org/docs) for more hardhat commands

## Contract functions

### BasicNft contract

`mintNft`

- Stores a property
- Arguments: string tokenUri
- `tokenUri` = imageUrl of the property

`getCounter`

- Gets the counter state of the contract/ number of property that has been stored since inception
- Arguments: None

`getTokenUri`

- Get the imageURL of a property
- Arguments: uint256 tokenId
- `tokenId` = the Id of the property

### Transfer property contract

`transferItem`

- Transfers property from one address to the other
- Arguments: address propertyAddress, uint256 tokenId, address ownerAddress
- `propertyAddress` = address of the property/basicNft contract
- `tokenId` = tokenId of the property

- `ownerAddress` = address of the user the property is to be transferred to.
