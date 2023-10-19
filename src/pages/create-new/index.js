import React, { useEffect } from "react";
import { Formik, FieldArray, Field, Form, useFormik } from "formik";
import * as yup from "yup";
import CreateSafeForm from "@/components/createSafeForm";
import { ethers } from "ethers";
import { mumbaiABI } from "../abi/mumbaiABI";
import { useAccount } from "wagmi";

const CreateSafe = () => {
  const { address } = useAccount();
  const validationSchema = yup.object().shape({
    safeName: yup.string().required("Required"),
    // owners: yup.array().of(yup.string().required("Owner address is required")),
  });

  const formik = useFormik({
    initialValues: {
      safeName: "",
      owner1: address,
      owner2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(
        "VALUESS",
        values.owner2,
        new ethers.providers.JsonRpcProvider(window.ethereum)
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      await provider.send("eth_requestAccounts", [0]);
      let signer = provider.getSigner();
      console.log(signer);

      const mumbaiContractAddress =
        "0xBb429875392D9d2Ef21428426bB8F2288508c33e";

      const mumbaiContract = new ethers.Contract(
        mumbaiContractAddress,
        mumbaiABI,
        signer
      );
      console.log("mumbaiContract", mumbaiContract);

      const res = await mumbaiContract.setSigner(values.owner2);
      console.log(res);
      formik.resetForm();
      alert(await mumbaiContract.safeId());
    },
  });

  useEffect(() => {
    // Update the addressField value in the form
    formik.setFieldValue("owner1", address);
  }, [address, formik.setFieldValue]);
  console.log(formik);
  return (
    <div className="h-screen py-28 bg-[#1E1e1e] bg-[url('/bg2.png')] bg-center">
      <div className="w-[80%] rounded-xl mx-auto bg-[#000]/30 backdrop-blur-md p-5 border border-gray-600">
        <div className="mx-auto flex gap-14 px-3 py-5">
          <div className="flex-[0.33] bg-gradient-to-b from-[#3f013e] via-[#823782] to-[#3600b5]  rounded-xl px-9 py-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white text-3xl font-semibold mb-4">
                Start your treasury management journey with us.
              </h2>
            </div>
          </div>
          <div className="flex-[0.67] pr-10 py-4">
            <h2 className="text-3xl bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]  font-semibold mb-6">
              Register Here
            </h2>
            <CreateSafeForm formik={formik} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSafe;
