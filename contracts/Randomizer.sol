//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "./IERC20.sol";
import "hardhat/console.sol";

contract Randomizer is VRFConsumerBase {
    address constant VRF_COORDINATOR_ADDRESS_KOVAN = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9;
    address constant LINK_TOKEN_ADDRESS_KOVAN = 0xa36085F69e2889c224210F603D836748e7dC0088;
    bytes32 public constant RANDOMNESS_KEY_HASH_KOVAN = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
    uint public constant RANDOMNESS_FEE_KOVAN = 0.1 ether;

    bytes32[] public randomNumberRequestIds;
    mapping(bytes32 => uint) public randomNumbers;

    constructor() VRFConsumerBase(
        VRF_COORDINATOR_ADDRESS_KOVAN,
        LINK_TOKEN_ADDRESS_KOVAN
    ) {}

    function getRandomNumber() public {
        require(canPayForARequest(), "Insufficient LINK balance");

        bytes32 requestId = requestRandomness(RANDOMNESS_KEY_HASH_KOVAN, RANDOMNESS_FEE_KOVAN);
        randomNumberRequestIds.push(requestId);
    }

    function fulfillRandomness(bytes32 requestId, uint randomNumber) internal override {
        randomNumbers[requestId] = randomNumber;
    }

    function numberOfRequests() external view returns (uint) {
        return randomNumberRequestIds.length;
    }

    // Get Kovan LINK here: https://faucets.chain.link/kovan
    function canPayForARequest() public view returns (bool) {
        uint linkBalance = IERC20(LINK_TOKEN_ADDRESS_KOVAN).balanceOf(address(this));

        return linkBalance >= RANDOMNESS_FEE_KOVAN;
    }
}
