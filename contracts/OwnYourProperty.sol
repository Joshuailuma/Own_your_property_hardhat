// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract OwnYourProperty {
    event ItemSold(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    event MyProperty(
        address indexed owner,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    address seller; // Person that want to sell his property

    //A mapping
    // Contract Address -> NFT TokenID -> Listing
    // mapping(address => mapping(uint256 => seller)) private s_listings;

    //To see if item is listed
    // modifier isListed(address nftAddress, uint256 tokenId) {
    //     Listing memory listing = s_listings[nftAddress][tokenId];
    // }

    /*
     * @notice Method to transfer listed property
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     */
    function transferItem(
        address nftAddress,
        uint256 tokenId,
        address buyer
    ) external {
        // Listing memory listedItem = s_listings[nftAddress][tokenId];

        // delete (s_listings[nftAddress][tokenId]); // Delete it from the listing list
        // Transfer the property
        IERC721(nftAddress).safeTransferFrom(msg.sender, buyer, tokenId);
        emit ItemSold(msg.sender, nftAddress, tokenId); // EMit the stuff
    }
}
