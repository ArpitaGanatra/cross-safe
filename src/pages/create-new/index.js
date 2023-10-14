import React from "react";
import { Formik, FieldArray, Field, Form, useFormik } from "formik";
import * as yup from "yup";
import CreateSafeForm from "@/components/createSafeForm";

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
      console.log("VALUESS", values);
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CreateSafeForm formik={formik} />
    </div>
  );
};

export default CreateSafe;
