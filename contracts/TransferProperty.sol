// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TransferProperty {
    error NotOwner();

    // New Buyer is the ownerAddress
    event ItemSold(
        address indexed ownerAddress,
        address indexed propertyAddress,
        uint256 indexed tokenId
    );

    modifier isOwner(
        address propertyAddress,
        uint256 tokenId,
        address seller
    ) {
        IERC721 nft = IERC721(propertyAddress);
        address owner = nft.ownerOf(tokenId);
        if (seller != owner) {
            revert NotOwner();
        }
        _;
    }

    /*
     * @notice Method to transfer listed property
     * @param propertyAddress Address of NFT contract
     * @param tokenId Token ID of NFT/property
     */
    function transferItem(
        address propertyAddress,
        uint256 tokenId,
        address ownerAddress
    ) external isOwner(propertyAddress, tokenId, msg.sender) {
        // Transfer the property
        IERC721(propertyAddress).safeTransferFrom(
            msg.sender,
            ownerAddress,
            tokenId
        );
        emit ItemSold(ownerAddress, propertyAddress, tokenId); // EMit the stuff
    }

    /*
     * @notice Method to check the owner of a property
     * @param propertyAddress Address of NFT contract
     * @param tokenId Token ID of NFT/property
     */
    function checkOwner(
        address propertyAddress,
        uint256 tokenId
    ) public view returns (address) {
        IERC721 nft = IERC721(propertyAddress);
        address owner = nft.ownerOf(tokenId);
        return owner;
    }
}
