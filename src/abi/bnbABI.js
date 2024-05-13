export const bnbAbi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_gateway",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_gasReceiver",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotApprovedByGateway",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_signer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "safeId",
				"type": "uint256"
			}
		],
		"name": "sendNotification",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "commandId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "sourceChain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sourceAddress",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "payload",
				"type": "bytes"
			}
		],
		"name": "execute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "commandId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "sourceChain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sourceAddress",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "payload",
				"type": "bytes"
			},
			{
				"internalType": "string",
				"name": "tokenSymbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "executeWithToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gasService",
		"outputs": [
			{
				"internalType": "contract IAxelarGasService",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gateway",
		"outputs": [
			{
				"internalType": "contract IAxelarGateway",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_safeIdd",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "destinationChain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "destinationAddress",
				"type": "string"
			}
		],
		"name": "setStatus",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]