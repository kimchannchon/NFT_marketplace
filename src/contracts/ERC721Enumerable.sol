// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';
import './interfaces/IERC721Enumerable.sol';

contract ERC721Enumerable is ERC721, IERC721Enumerable {

    uint256[] private _allTokens;

    // mapping from tokenId to position in _allTokens array
        mapping(uint256 => uint256) private _allTokensIndex;
    // mapping of owner to list of all owner token ids
        mapping(address => uint256[]) private _ownedTokens;
    // mapping from token ID idex of the owner tokens list
        mapping(uint256 => uint256) private _ownedTokensIndex;
    
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        // 1. add token to the owner
        // 2. add all tokens to the total supply - to allTokens
        _addTokensToAllTokenEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    // add token to the _allTokens array & set the position of the tokens indexes
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private{
        // 1. add address & token ID to the _ownedTokens
        // 2. ownedTokensIndex tokenId set to address of ownTokens position
        // 3. execute the func when minting
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    // 2 functions
    // - return tokenByToken
    // - return tokenOfOwnerByIndex
    function tokenByIndex(uint256 index) public view override returns(uint256) {
        require(index < totalSupply(), 'global index is out of bounds!');
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns(uint256) {
        require(index < balanceOf(owner), 'owner index is out of bounds!');
        return _ownedTokens[owner][index];
    }

    // return the total supply of the _allTokens array
    function totalSupply() public view override returns(uint256) {
        return _allTokens.length;
    }
}
