import React, { useEffect } from "react";
import { Formik, FieldArray, Field, Form, useFormik } from "formik";
import * as yup from "yup";
import CreateSafeForm from "@/components/createSafeForm";
import { ethers } from "ethers";
import { goerliABI } from "../../abi/goerliABI";
import { useAccount } from "wagmi";
import { avaxContractAddress, goerliContractAddress } from "@/libs/constants";

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
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", [0]);

      let signer = provider.getSigner();

      const goerliContract = new ethers.Contract(
        "0x8e5365A92D0b8681474db176fE863a4b9B0248B0",
        goerliABI,
        signer
      );
      const res = await goerliContract.createSafe(
        values.safeName,
        values.owner2,
        "binance",
        "0xb985a8f4f98575268E68E2706F35A416e7A01881",
        { value: ethers.utils.parseEther("0.13") }
      );
      console.log("first", res);

      formik.resetForm();
      async function getSafeId() {
        const id = await goerliContract.safeId();
        return Number(id);
      }

      getSafeId().then((safeId) => {
        alert(`Your safe id is: ${safeId + 1}.`);
      });
    },
  });

  useEffect(() => {
    // Update the addressField value in the form
    formik.setFieldValue("owner1", address);
  }, [address, formik.setFieldValue]);
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
