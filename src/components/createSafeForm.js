import React from "react";
import clsx from "clsx";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, VStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CreateSafeForm = ({ formik }) => {
  const { address } = useAccount();
  return (
    <form onSubmit={formik.handleSubmit}>
      <VStack spacing={4} align="flex-start">
        <div className="flex flex-col text-white">
          <label htmlFor="safeName">Name of Safe</label>
          <input
            id="safeName"
            name="safeName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.safeName}
            className={clsx(
              `input_box ${
                formik.errors.safeName && formik.touched.safeName
                  ? "border border-red-500"
                  : "border border-[#334155]"
              }`
            )}
          />
          {formik.errors.safeName && formik.touched.safeName && (
            <div className="text-xs text-red-500 ">
              {formik.errors.safeName}
            </div>
          )}
        </div>
        <div className="flex flex-col text-white">
          <label htmlFor="owner1">Owner1</label>
          <input
            id="owner1"
            name="safeName"
            type="owner1"
            onChange={formik.handleChange}
            value={formik.values.owner1}
            className={clsx(
              `input_box ${
                formik.errors.owner1 && formik.touched.owner1
                  ? "border border-red-500"
                  : "border border-[#334155]"
              }`
            )}
          />
        </div>

        <div className="flex flex-col text-white">
          <label htmlFor="owner2">Owner2</label>
          <input
            id="owner2"
            name="owner2"
            type="owner2"
            onChange={formik.handleChange}
            value={formik.values.owner2}
            className={clsx(
              `input_box ${
                formik.errors.owner2 && formik.touched.owner2
                  ? "border border-red-500"
                  : "border border-[#334155]"
              }`
            )}
          />
        </div>

        {address ? (
          <Button type="submit">create safe</Button>
        ) : (
          <ConnectButton />
        )}
      </VStack>
    </form>
  );
};

export default CreateSafeForm;
