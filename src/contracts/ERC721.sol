// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/*
    1. NFT, point to an address.
    2. Track token ids.
    3. Track owner address.
    4. Track owner's token amount.
    5. Create an event [emit tranfer log - contract address minted to, the id]
*/

contract ERC721 {

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    
    mapping(uint256 => address) private _tokenOwner;
    mapping(address => uint256) private _ownedTokensCount;

    function _exists(uint256 tokenId) internal view returns(bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), 'ERC721: minting to the zero address');
        require(!_exists(tokenId), 'ERC721: token already minted');

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }
}
