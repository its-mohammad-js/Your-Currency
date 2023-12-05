import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input, RadioInput } from "../../components/Inputs/Inputs";
import { useAuth } from "../../components/Context/AuthContext";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  remember: true,
};

const radioOptions = [
  { label: "male", value: "0" },
  { label: "female", value: "1" },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is reduired")
    .min(3, "Name length is not valid"),
  email: Yup.string()
    .email("Invaild email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirm: Yup.string()
    .required("confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("gender is required"),
});

function SignUpPage() {
  const navigate = useNavigate();
  const { isAuthenticated, authUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  function onSubmit(values) {
    authUser(values);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/Your-Currency/");
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto 2xl:max-w-6xl h-screen flex justify-center items-center relative">
      {/* main form */}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-primary-500 bg-opacity-80 hover:bg-opacity-95 transition-all shadow-sm rounded-md px-4 py-2 md:px-6 md:py-4 w-11/12 md:w-1/2"
      >
        {/* title */}
        <h2 className="text-secondary-100 text-center my-3 text-lg font-bold cursor-pointer">
          Sign in your bank
        </h2>

        <Input formik={formik} name={"name"} label={"Name"} />

        <Input formik={formik} name={"email"} label={"Email"} />

        <Input formik={formik} name={"password"} label={"Password"} />

        <Input
          formik={formik}
          name={"passwordConfirm"}
          label={"Confirm Password"}
        />

        <RadioInput
          radioOptions={radioOptions}
          formik={formik}
          name={"gender"}
        />

        {/* buttons section */}
        <div id="form-control" className="flex flex-col items-center gap-y-3">
          <button
            type="submit"
            className="bg-secondary-100 text-white-100 px-4 py-2 rounded-md hover:bg-primary-100 hover:text-secondary-100 transition-all outline-none"
          >
            Sign in Your Currency
          </button>
          <button
            type="button"
            onClick={() => navigate("/Your-Currency/logIn")}
            className="md:my-1"
          >
            Already have an account?
          </button>
        </div>
      </form>

      {/* background picture */}
      <img
        src="./images/signUp background.jpg"
        alt="background-money"
        className="w-full h-full absolute z-[-1] object-cover opacity-40"
      />
    </div>
  );
}

export default SignUpPage;
