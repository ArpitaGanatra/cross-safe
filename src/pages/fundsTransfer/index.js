import React from "react";

const index = () => {
  const [safeId, setSafeId] = useState("");
  const [valueInUSDC, setvalueInUSDC] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* safe id, value in usdc */}
      <input
        type="text"
        value={safeId}
        onChange={(e) => setSafeId(e.target.value)}
        className="input_box"
      />
      <input
        type="text"
        value={valueInUSDC}
        onChange={(e) => setvalueInUSDC(e.target.value)}
        className="input_box"
      />
      <button>submit</button>
    </div>
  );
};

export default index;
