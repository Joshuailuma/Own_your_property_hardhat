// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error BasicNft__AlreadyInitialized();

contract BasicNft is ERC721URIStorage {
    uint256 private s_tokenCounter;
    bool private s_initialized;

    // Mapping tokenId to tokenUri
    mapping(uint => string) private tokenIdToUri;

    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed ownerAddress,
        address propertyAddress
    );

    constructor() ERC721("TransferProperty", "OYP") {
        s_tokenCounter = 0;
    }

    function mintNft(string memory tokenUri) public {
        s_tokenCounter += 1;
        tokenIdToUri[s_tokenCounter] = tokenUri;
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

    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return tokenIdToUri[tokenId];
    }

    function getInitialized() public view returns (bool) {
        return s_initialized;
    }
}
