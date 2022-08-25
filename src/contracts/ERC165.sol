// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IERC165.sol';

contract ERC165 is IERC165 {

    // hash table to keep track of contract fingerprint data of byte function conversion
    mapping(bytes4 => bool) private _supportedInterfaces;

    function supportsInterface(bytes4 interfaceID) external override view returns(bool) {
        return _supportedInterfaces[interfaceID];
    }

    function _registerInterface(bytes4 interfaceID) internal {
        require(interfaceID != 0xffffffff, 'Invalid interface request');
        _supportedInterfaces[interfaceID] = true;
    }

    constructor() {
        _registerInterface(bytes4(keccak256('supportsInterface(bytes4)')));
    }
}