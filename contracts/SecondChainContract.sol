   // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';
// avax 0x4806c0858dfCAf2B58d10889bC6e40B0e12fb9fC //Bsc
//gas 150000000000000000
contract test2 is AxelarExecutable {
        string public message;
    event sendNotification(address _signer,uint256 safeId);
    IAxelarGasService public immutable gasService;

    constructor(address _gateway,address _gasReceiver) AxelarExecutable(_gateway) {
                gasService = IAxelarGasService(_gasReceiver);
    }
    mapping(uint256 =>bool) signingStatus;
    mapping(uint256 => address) safeOwner;

//avax :0x6cEf02c013F9fFeC512F6467D3667972c70C2c38
    /**
     * @notice logic to be executed on dest chain
     * @dev this is triggered automatically by relayer
     * @param _sourceChain blockchain where tx is originating from 
     * @param _sourceAddress address on src chain where tx is originating from
     * @param _payload encoded gmp message sent from src chain
     */
    function _execute(
        string calldata _sourceChain,
        string calldata _sourceAddress,
        bytes calldata _payload
    ) internal override {
        uint256 safeId;
        address secondOwner;
        (safeId,secondOwner) = abi.decode(_payload, (uint256,address));
        safeOwner[safeId] = secondOwner;
    }



    function setStatus(uint256 _safeId,string calldata destinationChain,
        string calldata destinationAddress) external payable {
        require(msg.sender == safeOwner[_safeId], "Intruder spotted");
        signingStatus[_safeId] = true;

        bytes memory payload = abi.encode(_safeId,true);
        require(msg.value > 0, 'Gas payment is required');
        gasService.payNativeGasForContractCall{ value: msg.value }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
        emit sendNotification(msg.sender, _safeId);

    }

    function getStatus(uint256 _safeId) public view returns (bool) {
        return signingStatus[_safeId];
    }

     function getOwner(uint256 _safeId)
        public view
        returns (address _owner2, uint256 _safeIdd)
    {
        return (safeOwner[_safeId],_safeId);
    }

}