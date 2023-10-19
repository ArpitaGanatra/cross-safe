import React, { useState } from "react";
import { mumbaiABI } from "../abi/mumbaiABI";
import { ethers } from "ethers";

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
    <div className="min-h-screen flex items-center justify-center">
      <input
        type="text"
        value={safeId}
        onChange={(e) => setSafeId(e.target.value)}
        className="input_box"
      />
      <button onClick={showSafeInfo}>show</button>
      Owners: {safeInfo.a1}
    </div>
  );
};

export default index;
