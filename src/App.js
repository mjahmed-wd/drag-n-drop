import React from "react";
import "./App.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import DragCsvUpload from "./components/DragCsvUpload/DragCsvUpload";

const initData = {
  firstName: "",
  lastName: "",
  email: "",
};

let validationSchema = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
});

const App = () => {
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("submitted", values);
        }}
      >
        {({
          handleSubmit,
          resetForm,
          values,
          errors,
          touched,
          setFieldValue,
          isValid,
        }) => (
          <>
            <Form>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                onChange={(valueOption) =>
                  setFieldValue("firstName", valueOption?.target?.value)
                }
              />
              <ErrorMessage name="firstName" component="div" />
              <Field
                type="text"
                name="lastName"
                id="lastName"
                onChange={(valueOption) =>
                  setFieldValue("lastName", valueOption?.target?.value)
                }
              />
              <ErrorMessage name="lastName" component="div" />
              <Field
                type="email"
                name="email"
                id="email"
                onChange={(valueOption) =>
                  setFieldValue("email", valueOption?.target?.value)
                }
              />
              <ErrorMessage name="email" component="div" />
              <button type="submit">Submit</button>
            </Form>
          </>
        )}
      </Formik>
      <DragCsvUpload/>
    </div>
  );
};

export default App;
