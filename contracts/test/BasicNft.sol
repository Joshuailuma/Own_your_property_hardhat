// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error BasicNft__AlreadyInitialized();

contract BasicNft is ERC721URIStorage {
    uint256 private s_tokenCounter;

    // Mapping tokenId to tokenUri
    // Every tokenId should have a unique uri
    mapping(uint => string) private tokenIdToUri;

    event PropertyMinted(
        uint256 indexed tokenId,
        address indexed ownerAddress,
        address propertyAddress
    );

    constructor() ERC721("TransferProperty", "OYP") {
        s_tokenCounter = 0;
    }

    // Store a property
    function mintNft(string memory tokenUri) public {
        s_tokenCounter += 1;
        tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter); //To mint the nft

        _setTokenURI(s_tokenCounter, tokenUri); //Gives/sets the token uri a name
        emit PropertyMinted(s_tokenCounter, msg.sender, address(this));
    }

    // Get the token counter of a property
    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    // Get the tokenUri of a property
    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return tokenIdToUri[tokenId];
    }
}
