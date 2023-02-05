import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Please provide a first name"),
    lastName: Yup.string().required("Please provide a last name"),
    email: Yup.string().email().required("Please provide a valid email"),
    password: Yup.string().required("Please provide a password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,

    onSubmit: (values, { resetForm }) => {
      const { firstName, lastName, email, password } = values;
      resetForm();
      axios
        .post("http://localhost:3000/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((result) => {
          setRegister(true);
          console.log(result);
        })
        .catch((error) => (error = new Error()));
    },
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-p sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            className="space-y-6 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div className="my-5">
              <input
                id="firstName"
                className="border-solid border-2 border-sky-500"
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && formik.touched.firstName ? (
                <div className="text-red-500 text-center">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>

            <div className="my-5">
              <input
                id="lastName"
                className="border-solid border-2 border-sky-500"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="text-red-500 text-center">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>

            <div className="my-5">
              <label className="mx-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                className="border-solid border-2 border-sky-500"
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-center">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="my-5">
              <label className="mx-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                className="border-solid border-2 border-sky-500"
                type="password"
                placeholder="Enter Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 text-center">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-blue-700 cursor-pointer hover:underline mx-3"
          >
            Login
          </span>
        </h3>
      </div>
      {register && (
        <p className="text-green-600 text-center">
          You are registered successfully
        </p>
      )}
    </section>
  );
};

export default RegisterPage;
