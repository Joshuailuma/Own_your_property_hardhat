// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error BasicNft__AlreadyInitialized();

contract BasicNft is ERC721URIStorage {
    uint256 private s_tokenCounter;
    string internal s_TokenUri;
    bool private s_initialized;

    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed ownerAddress,
        address indexed propertyAddress
    );

    constructor() ERC721("OwnYourProperty", "OYP") {
        s_tokenCounter = 0;
    }

    function mintNft(string memory tokenUri) public {
        s_TokenUri = tokenUri;
        s_tokenCounter += 1;
        _safeMint(msg.sender, s_tokenCounter); //To mint the nft

        _setTokenURI(s_tokenCounter, tokenUri); //Gives/sets the token uri a name
        emit PropertyMinted(s_tokenCounter, msg.sender, address(this));
    }

    // function _initializeContract(string memory tokenUri) private {
    //     if (s_initialized) {
    //         revert BasicNft__AlreadyInitialized();
    //     }
    //     s_TokenUri = tokenUri;
    //     s_initialized = true;
    // }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getTokenUri() public view returns (string memory) {
        return s_TokenUri;
    }

    function getInitialized() public view returns (bool) {
        return s_initialized;
    }
}
