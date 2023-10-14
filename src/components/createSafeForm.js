import { Field, FieldArray, FormikProvider } from "formik";
import React from "react";

const CreateSafeForm = ({ formik }) => {
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="safeName">Name of Safe</label>
          <input
            id="safeName"
            name="safeName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.safeName}
          />
          {formik.errors.safeName && formik.touched.safeName && (
            <div>{formik.errors.safeName}</div>
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
                    value={formik.values.owners[index]}
                  />

                  <button
                    type="button"
                    onClick={(value) => {
                      const list = [...formik.values.owners];
                      list.splice(index, 1);
                      formik.setFieldValue("owners", list);
                    }}
                    disabled={index === 0}
                  >
                    Remove Owner
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={(value) => {
                formik.setFieldValue("owners", [...formik.values.owners, ""]);
              }}
            >
              Add Owner
            </button>
          </div>
        </div>

        <div>
          <button type="submit">create safe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSafeForm;
