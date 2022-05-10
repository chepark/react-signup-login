import "./_formSignup.styles.scss";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../form-input/FormInput.component";
import {
  signup,
  signupWithFacebook,
  signupWithGoogle,
} from "../../api/AuthApi";
import { useAuth } from "../../contexts";
import { getUserByEmail } from "../../api";

const FormSignup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    // getUserByEmail("parkchaeah331@gmail.com");
  }, []);

  const validateInputs = () => {
    let isError = {};

    if (values.username.length < 4)
      isError.username = "At least 4 characaters required.";
    else if (values.username === "")
      isError.username = "User name is required.";

    if (!/\S+@\S+\.\S+/.test(values.email))
      isError.email = "Email address is invalid.";
    else if (values.email === "") isError.email = "Email is required.";

    if (values.password.length < 6)
      isError.password = "At least 6 characaters required.";

    if (values.password2 !== values.password)
      isError.password2 = "Passwords do not match.";

    // Check if any errors are in isError.
    if (Object.keys(isError).length > 0) {
      setErrors(isError);
      return false;
    } else return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors();

    // Check if the email is already taken.
    await getUserByEmail(values.email, setErrors);

    // Validate user inputs are correct
    if (!validateInputs()) return;

    signup(values, (val) => {
      dispatch(val);
      setLoading(false);
      navigate("/", { replace: true });
    });

    setLoading(true);
  };

  const handleClickFacebookSignUp = (e) => {
    e.preventDefault();

    signupWithFacebook((val) => {
      dispatch(val);
      navigate("/", { replace: true });
    });
  };

  const handleClickGoogleSignup = (e) => {
    e.preventDefault();
    signupWithGoogle((val) => {
      dispatch(val);
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="form-signup-container">
      <h2 className="form-header">Sign Up</h2>
      <form className="form-signup" noValidate onSubmit={handleSubmit}>
        <FormInput
          label="User Name"
          type="text"
          required
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors && errors.username ? (
          <p className="form-error">*{errors.username}</p>
        ) : (
          ""
        )}

        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors && errors.email ? (
          <p className="form-error">*{errors.email}</p>
        ) : (
          ""
        )}
        {errors && errors.exist ? (
          <p className="form-error">*{errors.exist}</p>
        ) : (
          ""
        )}
        <FormInput
          label="Password"
          type="text"
          required
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors && errors.password ? (
          <p className="form-error">*{errors.password}</p>
        ) : (
          ""
        )}
        <FormInput
          label="Confirm Password"
          type="text"
          required
          name="password2"
          value={values.password2}
          onChange={handleChange}
        />
        {errors && errors.password2 ? (
          <p className="form-error">*{errors.password2}</p>
        ) : (
          ""
        )}

        <button
          className="form-button button-submit"
          type="submit"
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <div className="line">
        <span>or</span>
      </div>
      <div className="social-signup">
        <button
          className="form-button facebook-signup"
          onClick={handleClickFacebookSignUp}
        >
          Sign Up with Facebook
        </button>
        <button
          className="form-button google-signup"
          onClick={handleClickGoogleSignup}
        >
          Sign Up with Google
        </button>
      </div>
      <p className="form-link">
        Already have an account?{" "}
        <Link to="/login" className="text-link">
          Log in
        </Link>
      </p>
      {
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      }
    </div>
  );
};

export default FormSignup;
