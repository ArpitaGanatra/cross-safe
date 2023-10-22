pragma solidity ^0.8.7;

//To be deployed on Mumbai

interface IInterchainQueryRouter {
    /**
     * @param _destinationDomain Domain of destination chain
     * @param target The address of the contract to query on destination chain.
     * @param queryData The calldata of the view call to make on the destination
     * chain.
     * @param callback Callback function selector on `msg.sender` and optionally
     * abi-encoded prefix arguments.
     * @return messageId The ID of the Hyperlane message encoding the query.
     */
    //0x9123FcAa2C563d3918Bbd3d65914014767006d05
    function query(
        uint32 _destinationDomain,
        address target,
        bytes calldata queryData,
        bytes calldata callback
    ) external returns (bytes32);
}

interface QuerydestChain {
    struct safe {
        address owner;
        bool status;
    }

    function getStatus(uint256 _safeId) external view returns (bool);
}

interface IInterchainGasPaymaster {
    function payForGas(
        bytes32 _messageId,
        uint32 _destinationDomain,
        uint256 _gasAmount,
        address _refundAddress
    ) external payable;

    function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount)
        external
        view
        returns (uint256);
}

interface IusdcToken {
    function transferFrom(address src,address _dest, uint256 anount) external returns (bool);
    function transfer(address _dest, uint256 anount) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function balanceOf(address account) external returns (uint256);
}

contract f1 {
    uint32 immutable Domain;
    address immutable iqsRouter;
    event widthrawMoney(uint256 balance, address receiver,uint256 _safeId, uint256 chainId);
    event moneyWidthrawn(uint256 balance, address receiver,uint256 _safeId, uint256 chainId);
    event signedTransaction(address a1, address a2,uint256 _safeId);
    event safeCreated(address a1, address a2,uint256 _safeId);

    event sendNotification(address a1, address a2,uint256 _safeId, uint256 amt);
    IusdcToken public usdc;

    constructor() {
        Domain = 43113; //destination
        iqsRouter = 0x46A2B1C3E8a93C3613Ebf326235FbD3e2f65660F;
        usdc = IusdcToken(0x07865c6E87B9F70255377e024ace6630C1Eaa37F); //usdc on goerli
    }

    struct addr {
        string name;
        address a1;
        address a2;
        bool sts1;
        bool sts2;
        uint256 balance;
        uint256[] timestamps;
    }
    mapping(uint256 => addr) public safeOwner;
    uint256 public safeId;
    // consistent across all chains

    /// @notice Only allow this function to be called via an IQS callback.
    modifier onlyCallback() {
        require(msg.sender == iqsRouter);
        _;
    }

    function writeOwner(uint256 _safeId, bool _sts) external onlyCallback {
        safeOwner[_safeId].sts2 = _sts;
    }

    //Give contract address of second
    // abi.encodeWithSignature is primarily used to encode function calls for smart contracts.
    // It includes the function signature along with parameter values.

    // abi.encodePacked is used to tightly pack values for various purposes, such as hashing or concatenation.
    // It doesn't include function signatures and doesn't add any padding between values.
    function queryOwner(uint256 _safeId, address _contractAddress)
        external
        payable
        returns (bytes32)
    {
        bytes memory _ownerCall = abi.encodeWithSignature(
            "getStatus(uint256)",
            (_safeId)
        );
        // The return value of ownerOf() will be automatically appended when
        // making this callback
        bytes memory _callback = abi.encodePacked(
            this.writeOwner.selector,
            _safeId
        );
        // Dispatch the call. Will result in a view call of ENS.ownerOf() on Ethereum,
        // and a callback to this.writeOwner(_label, _owner).
        bytes32 messageId = IInterchainQueryRouter(iqsRouter).query(
            Domain,
            _contractAddress,
            _ownerCall,
            _callback
        );

        IInterchainGasPaymaster igp = IInterchainGasPaymaster(
            0xF90cB82a76492614D07B82a7658917f3aC811Ac1
        );
        // Pay with the msg.value
        igp.payForGas{value: msg.value}(
            // The ID of the message
            messageId,
            // Destination domain
            Domain,
            // The total gas amount. This should be the
            // overhead gas amount (80,000 gas) + gas used by the query being made
            80000 + 100000,
            // Refund the msg.sender
            msg.sender
        );

        return (messageId);
    }

    //CAll this first

    function setSigner(string memory _name, address _crossChainAddress)
        public
        returns (uint256)
    {
        safeId++;
        safeOwner[safeId].name = _name;
        safeOwner[safeId].a1 = msg.sender;
        safeOwner[safeId].a2 = _crossChainAddress;
        emit safeCreated(safeOwner[safeId].a1, safeOwner[safeId].a2, safeId);

        return (safeId);
    }
//set approval for owner 1
    function SetApproval(uint256 _safeId) public {
        require(
            msg.sender == safeOwner[_safeId].a1 &&
                safeOwner[_safeId].sts1 == false,
            "You are not the owner of the safe"
        );
        safeOwner[_safeId].sts1 = true;
        emit signedTransaction(safeOwner[_safeId].a1,safeOwner[_safeId].a2,_safeId);
    }

event fundsAdded(address a1,address a2,uint256 _safeId,uint256 _amt);
//Do Approve usdc before calling this function
    function storeFunds(uint256 _safeId, uint256 _amt) external {
        usdc.transferFrom(msg.sender,address(this), _amt*1000000);
        safeOwner[_safeId].balance = safeOwner[_safeId].balance + _amt;
emit fundsAdded(safeOwner[_safeId].a1, safeOwner[_safeId].a2, _safeId, _amt);
    }
//Widthraw USDC for admin
    function widthrawUsdc() external {
        require(
            msg.sender == 0x82a7A0828fa8EB902f0508620Ee305b08634318A,
            "Only Owner"
        );
        usdc.transfer(
            0x82a7A0828fa8EB902f0508620Ee305b08634318A,
            usdc.balanceOf(address(this))*1000000
        );
    }

    function returnOwner(uint256 _safeId) external view returns (address) {
        return (safeOwner[_safeId].a2);
    }

    function getOwner(bytes memory _encodedData)
        external
        pure
        returns (address _owner2, uint256 _safeId)
    {
        (_owner2, _safeId) = abi.decode(_encodedData, (address, uint256));
    }
//send notification about widthraw request
    function widthrawrequest(uint256 _safeId, uint256 _amt) public {
        require(
            msg.sender == safeOwner[_safeId].a1,
            "You are not the owner of the safe"
        );
        require(
            _amt <= safeOwner[_safeId].balance,
            "The amount is greater than Safe Balance"
        );
        emit sendNotification(
            safeOwner[_safeId].a1,
            safeOwner[_safeId].a2,_safeId,
            _amt
        );
    }

    function withdraw(
        uint256 _safeId,
        uint256 _amt,
        address _addr,
        uint256 _chainId
    ) public {
        if (
            safeOwner[_safeId].sts1 == true && safeOwner[_safeId].sts2 == true
        ) {
            require(
                _amt <= safeOwner[_safeId].balance,
                "The amount is greater than Safe Balance"
            );
            if(_chainId == 5){
              emit moneyWidthrawn(_amt, _addr,_safeId, _chainId); // Widthraw money on same chain
            usdc.transfer(_addr, _amt*1000000);
            safeOwner[_safeId].sts1 = false;
            safeOwner[_safeId].sts2 = false;
            safeOwner[_safeId].balance = safeOwner[_safeId].balance - _amt;
            safeOwner[_safeId].timestamps.push(block.timestamp);
            }else{
                emit widthrawMoney(_amt, _addr,_safeId, _chainId); //eidthraw money on different chain
                safeOwner[_safeId].sts1 = false;
                safeOwner[_safeId].sts2 = false;
                safeOwner[_safeId].balance = safeOwner[_safeId].balance - _amt;
                safeOwner[_safeId].timestamps.push(block.timestamp);

            }
        }
    }
}
