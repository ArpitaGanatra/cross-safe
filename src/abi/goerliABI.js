[
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
				"internalType": "string",
				"name": "_from",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "Executed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "a1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_funds",
				"type": "uint256"
			}
		],
		"name": "addFundsEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			}
		],
		"name": "moneyWidthrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "a1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "a2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "safeCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "a1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "a2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "sendNotification",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "a1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "a2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "signedTransaction",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "widthrawMoney",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_safeId",
				"type": "uint256"
			}
		],
		"name": "SetApproval",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "addFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_safeName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_secondSigner",
				"type": "address"
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
		"name": "createSafe",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
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
			}
		],
		"name": "returnOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "safeId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "safeOwner",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "a1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "a2",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "sts1",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "sts2",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sourceAddress",
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
		"inputs": [],
		"name": "sourceChain",
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
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			}
		],
		"name": "widthrawrequest",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]