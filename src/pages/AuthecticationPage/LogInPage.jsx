import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { CheckBoxInput, Input } from "../../components/Inputs/Inputs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";

const initialValues = {
  email: "",
  password: "",
  remember: true,
};

const checkBoxOptions = [{ label: "Remember Me", value: "Remember Me" }];

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invaild email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  remember: Yup.boolean(),
});

function LogInPage() {
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
          Log in to your account
        </h2>
        {/* email input */}
        <Input formik={formik} name={"email"} label={"Email"} />
        {/* password input */}
        <Input formik={formik} name={"password"} label={"Password"} />
        {/*  remember me checkbox */}
        <CheckBoxInput
          checkOptions={checkBoxOptions}
          formik={formik}
          name={"remember"}
        />

        {/* buttons section */}
        <div id="form-control" className="flex flex-col items-center gap-y-3">
          <button
            type="submit"
            className="bg-secondary-100 text-white-100 px-4 py-2 rounded-md hover:bg-primary-100 hover:text-secondary-100 transition-all"
          >
            Log in to your account
          </button>
          <button
            type="button"
            onClick={() => navigate("/Your-Currency/signUp")}
          >
            Don't have an account?
          </button>
        </div>
      </form>
      {/* background picture */}
      <img
        src="./images/logIn-backround.jpg"
        alt="backgroun-money"
        className="w-full h-full absolute z-[-1] object-cover opacity-40"
      />
    </div>
  );
}

export default LogInPage;
