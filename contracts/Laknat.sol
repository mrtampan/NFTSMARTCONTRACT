// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Laknat is ERC721Enumerable, Ownable{
    
    uint256 public constant MAX_SUPPLY = 20;
    constructor() ERC721("Laknat", "LAK"){

    }
    string private _baseTokenURI;

    function _baseURI() internal view virtual override returns(string memory){
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _baseTokenURI = baseURI_;
    }
    function mint(uint256 quantity_) external payable {
        require(totalSupply() + quantity_ <= MAX_SUPPLY, "Max Supply sudah terpenuhi");

        for(uint256 i = 1; i <= quantity_; i++){
            _safeMint(msg.sender, totalSupply() + 1);
        }
    }
}