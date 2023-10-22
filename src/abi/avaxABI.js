export const avaxABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "a1", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_safe",
        type: "uint256",
      },
    ],
    name: "sendNotification",
    type: "event",
  },
  {
    inputs: [],
    name: "Domain",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_safeId", type: "uint256" }],
    name: "getOwner",
    outputs: [
      { internalType: "address", name: "_owner2", type: "address" },
      { internalType: "uint256", name: "_safeIdd", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_safeId", type: "uint256" }],
    name: "getStatus",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "iqsRouter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_safeId", type: "uint256" },
      { internalType: "address", name: "_contractAddress", type: "address" },
    ],
    name: "queryOwner",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_safeId", type: "uint256" }],
    name: "setStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_safeId", type: "uint256" },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    name: "writeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
