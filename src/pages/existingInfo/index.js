import React, { useState } from "react";
import { mumbaiABI } from "../abi/mumbaiABI";
import { ethers } from "ethers";
import { Box, Button } from "@chakra-ui/react";

const index = () => {
  const [safeId, setSafeId] = useState("");
  const [safeInfo, setSafeInfo] = useState("");

  const showSafeInfo = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);

    const mumbaiContractAddress = "0xBb429875392D9d2Ef21428426bB8F2288508c33e";

    const mumbaiContract = new ethers.Contract(
      mumbaiContractAddress,
      mumbaiABI,
      provider
    );
    console.log("mumbaiContract", mumbaiContract);

    const res = await mumbaiContract.safeOwner(safeId);
    console.log("res", res);
    setSafeInfo(res);
  };
  return (
    <div className="h-screen py-28 bg-[#1E1e1e] bg-[url('/bg2.png')] bg-center">
      <div className="w-[80%] rounded-xl mx-auto bg-[#000]/30 backdrop-blur-md p-5 border border-gray-600">
        <div className="mx-auto flex gap-14 px-3 py-5">
          <div className="flex-[0.33] bg-gradient-to-b from-[#3f013e] via-[#823782] to-[#3600b5]  rounded-xl px-9 py-6 flex flex-col justify-between">
            <div>
              <div>
                <h2 className="text-white text-3xl font-semibold mb-4">
                  Existing Safe Info
                </h2>
                <p className="text-gray-300 text-base">Owner1:</p>
                <p>{safeInfo.a1}</p>
              </div>
              <div>
                <p className="text-gray-300 text-base">Owner2:</p>
                <p>{safeInfo.a2}</p>
              </div>
            </div>
          </div>
          <div className="flex-[0.67]  pr-10 py-4">
            <h2 className="text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]  font-semibold mb-6">
              Safe Info
            </h2>
            <div className="flex flex-col space-y-2">
              <h1 className="text-white">Safe Id</h1>
              <input
                type="text"
                value={safeId}
                onChange={(e) => setSafeId(e.target.value)}
                className="input_box text-white"
              />
              <Box as="span" display="inline-block">
                <Button w="auto" onClick={showSafeInfo}>
                  show
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
