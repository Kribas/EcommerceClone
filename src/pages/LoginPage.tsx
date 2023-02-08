import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import { SignInUserType } from "../types/AuthUserTypes";
import { signInUserFn } from "../api/authApi";

const LoginPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Please provide a valid email"),
    password: Yup.string().required("Please provide a password"),
  });

  const { mutateAsync } = useMutation(
    (userData: SignInUserType) => signInUserFn(userData),
    {
      onSuccess(data) {
        // set the cookie
        cookies.set("TOKEN", data.token, {
          path: "/",
        });
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, Number("2000"));
      },
      onError(error: any) {
        toast.error(error.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      mutateAsync(values);
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="px-6 md:h-screen text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-6">
                <input
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-red-500">{formik.errors.email}</span>
                ) : null}
              </div>

              <div className="mb-6">
                <input
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <span className="text-red-500">{formik.errors.password}</span>
                ) : null}
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 my-3">
                  Don't have an account?
                  <span
                    onClick={() => navigate("/register")}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-2 cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
            <>
              <ToastContainer />
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
