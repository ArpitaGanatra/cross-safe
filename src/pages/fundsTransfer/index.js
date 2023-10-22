import { Box, Button, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import clsx from "clsx";
import { ethers } from "ethers";
import { usdcABI } from "@/abi/usdcABI";
import { goerliContractAddress, usdcContractAddress } from "@/libs/constants";
import { useAccount } from "wagmi";
import { goerliABI } from "@/abi/goerliABI";

const index = () => {
  const { address } = useAccount();

  const [loadingTxn, setLoadingTxn] = useState(false);
  const formik = useFormik({
    initialValues: {
      txnType: "",
      safeId: "",
      amount: 0,
      address: "",
      chainId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(
        "VALUESS",
        values,
        parseInt(
          ethers.utils.parseUnits(values.amount.toString(), 6)
        ).toString()
      );
      setLoadingTxn(true);
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", [0]);
      let signer = provider.getSigner();
      let approveResponse;
      if (values.txnType === "add") {
        const usdcContract = new ethers.Contract(
          usdcContractAddress,
          usdcABI,
          signer
        );
        const allowanceResponse = await usdcContract.allowance(
          address,
          goerliContractAddress
        );
        if (
          allowanceResponse <
          parseInt(
            ethers.utils.parseUnits(values.amount.toString(), 6)
          ).toString()
        ) {
          debugger;
          approveResponse = await usdcContract.approve(
            goerliContractAddress,
            parseInt(
              ethers.utils.parseUnits(values.amount.toString(), 6)
            ).toString()
          );
          const goerliContract = new ethers.Contract(
            goerliContractAddress,
            goerliABI,
            signer
          );
          const storeResponse = await goerliContract.storeFunds(
            values.safeId,
            values.amount
          );
          setLoadingTxn(false);
        } else {
          const goerliContract = new ethers.Contract(
            goerliContractAddress,
            goerliABI,
            signer
          );
          const storeResponse = await goerliContract.storeFunds(
            values.safeId,
            values.amount
          );
          formik.resetForm();
          setLoadingTxn(false);
        }
      }
    },
  });

  return (
    <div className="h-screen py-28 bg-[#1E1e1e] bg-[url('/bg2.png')] bg-center">
      <div className="w-[80%] rounded-xl mx-auto bg-[#000]/30 backdrop-blur-md p-5 border border-gray-600">
        <div className="mx-auto flex gap-14 px-3 py-5">
          <div className="flex-[0.33] bg-gradient-to-b from-[#3f013e] via-[#823782] to-[#3600b5]  rounded-xl px-9 py-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-3xl font-semibold mb-4">
                Add funds to your safe.
              </h2>
              <br />
              <h2 className="text-white text-3xl font-semibold mb-4">
                OR
              </h2>{" "}
              <br />
              <h2 className="text-white text-3xl font-semibold mb-4">
                Withdraw funds on any chain. (We use 'avalanche fuji for this
                example')
              </h2>
            </div>
          </div>
          <div className="flex-[0.67]  pr-10 py-4">
            <h2 className="text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]  font-semibold mb-6">
              Add/ Withdraw
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <div className="text-white">
                  <h1 className="text-white">Type of transaction</h1>
                  <Select
                    placeholder="Select option"
                    onChange={(e) => {
                      formik.setFieldValue("txnType", e.target.value);
                    }}
                  >
                    <option value="add">Add</option>
                    <option value="withdraw">Withdraw</option>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2 text-white">
                  <h1 className="text-white">Safe Id</h1>
                  <input
                    id="safeId"
                    name="safeId"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.safeId}
                    className={clsx(
                      `input_box ${
                        formik.errors.safeId && formik.touched.safeId
                          ? "border border-red-500"
                          : "border border-[#334155]"
                      }`
                    )}
                  />
                  {formik.errors.safeId && formik.touched.safeId && (
                    <div className="text-xs text-red-500 ">
                      {formik.errors.safeId}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 text-white">
                  <h1 className="text-white">Amount in USDC</h1>
                  <input
                    id="amount"
                    name="amount"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    className={clsx(
                      `input_box ${
                        formik.errors.amount && formik.touched.amount
                          ? "border border-red-500"
                          : "border border-[#334155]"
                      }`
                    )}
                  />
                </div>
                {formik.errors.amount && formik.touched.amount && (
                  <div className="text-xs text-red-500 ">
                    {formik.errors.amount}
                  </div>
                )}

                {formik.values.txnType === "withdraw" && (
                  <>
                    <div className="flex flex-col space-y-2 text-white">
                      <h1 className="text-white">Destination Address</h1>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className={clsx(
                          `input_box ${
                            formik.errors.address && formik.touched.address
                              ? "border border-red-500"
                              : "border border-[#334155]"
                          }`
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-2 text-white">
                      <h1 className="text-white">Chain Id</h1>
                      <input
                        id="chainId"
                        name="chainId"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.chainId}
                        className={clsx(
                          `input_box ${
                            formik.errors.chainId && formik.touched.chainId
                              ? "border border-red-500"
                              : "border border-[#334155]"
                          }`
                        )}
                      />
                    </div>
                  </>
                )}

                <Box as="span" display="inline-block">
                  <Button
                    w="auto"
                    type="submit"
                    isLoading={loadingTxn}
                    loadingText="submitting"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="end"
                  >
                    submit txn
                  </Button>
                </Box>
              </VStack>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
