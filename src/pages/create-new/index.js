import React from "react";
import { Formik, FieldArray, Field, Form, useFormik } from "formik";
import * as yup from "yup";
import CreateSafeForm from "@/components/createSafeForm";
import { ethers } from "ethers";
import mumbaiABI from "../abi/mumbaiABI";

const CreateSafe = () => {
  const validationSchema = yup.object().shape({
    safeName: yup.string().required("Required"),
    // owners: yup.array().of(yup.string().required("Owner address is required")),
  });

  const formik = useFormik({
    initialValues: {
      safeName: "",
      owners: [""],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(
        "VALUESS",
        values,
        new ethers.providers.Web3Provider(window.ethereum)
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
      const res = await mumbaiContract.setSigner(values.owners[0]);
      console.log(res);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CreateSafeForm formik={formik} />
    </div>
  );
};

export default CreateSafe;
