import React from "react";
import clsx from "clsx";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, Box, VStack } from "@chakra-ui/react";

const CreateSafeForm = ({ formik }) => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh" w="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <div className="flex flex-col">
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
            <div>
              <div>
                <label>Owners</label>
                {formik.values.owners.length > 0 &&
                  formik.values.owners.map((owner, index) => (
                    <div key={index}>
                      <input
                        id={`owners[${index}]`}
                        name={`owners[${index}]`}
                        type="text"
                        onChange={(e, value) => {
                          const address = e.target.value;
                          const list = [...formik.values.owners];
                          list[index] = address;
                          console.log(list, list[index]);
                          formik.setFieldValue("owners", list);
                        }}
                        className="input_box border border-[#334155] mr-4 "
                        // className={clsx(
                        //   `input_box ${
                        //     formik.errors.safeName && formik.touched.safeName
                        //       ? "border border-red-500"
                        //       : "border border-[#334155]"
                        //   }`
                        // )}
                        value={formik.values.owners[index]}
                      />
                      <DeleteIcon
                        onClick={(value) => {
                          const list = [...formik.values.owners];
                          list.splice(index, 1);
                          formik.setFieldValue("owners", list);
                        }}
                        disabled={index === 0}
                      />
                      {/* <button
                    type="button"
                    onClick={(value) => {
                      const list = [...formik.values.owners];
                      list.splice(index, 1);
                      formik.setFieldValue("owners", list);
                    }}
                    disabled={index === 0}
                  >
                    Remove Owner
                  </button> */}
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={(value) => {
                    formik.setFieldValue("owners", [
                      ...formik.values.owners,
                      "",
                    ]);
                  }}
                >
                  Add Owner
                </button>
              </div>
            </div>

            <div>
              <Button type="submit">create safe</Button>
            </div>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateSafeForm;
