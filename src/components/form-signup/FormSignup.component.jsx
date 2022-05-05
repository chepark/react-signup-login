import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/FormInput.component";
import {
  signup,
  signupWithFacebook,
  signupWithGoogle,
} from "../../api/AuthApi";
import { useAuth } from "../../contexts";
import "./_formSignup.styles.scss";

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

    if (Object.keys(isError).length > 0) {
      setErrors(isError);
      return false;
    } else return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    signup(values.email, values.password, (val) => {
      dispatch(val);
      setLoading(false);
      // navigate("/", { replace: true });
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
    </div>
  );
};

export default FormSignup;
