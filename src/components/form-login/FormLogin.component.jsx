import "./_formLogin.styles.scss";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import FormInput from "../form-input/FormInput.component";
import { login, signupWithFacebook, signupWithGoogle } from "../../api/AuthApi";
import { useAuth } from "../../contexts";
import AlertMessage from "../alertMessage/AlertMessage.component";

const FormLogin = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(values.email, values.password, (val) => {
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
    <div className="form-login-container">
      <h2 className="form-header">Log In</h2>
      {state.loginError ? <AlertMessage message={state.loginError} /> : null}
      <form className="form-login" noValidate onSubmit={handleSubmit}>
        {/* {errors.email ? <p className="form-error">{errors.email}</p> : null} */}
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {/* {errors.password ? (
          <p className="form-error">{errors.password}</p>
        ) : null} */}
        <FormInput
          label="Password"
          type="text"
          required
          name="password"
          value={values.password}
          onChange={handleChange}
        />

        <button
          className="form-button button-submit"
          type="submit"
          disabled={loading}
        >
          Log In
        </button>
      </form>

      <div className="line">
        <span>or</span>
      </div>

      <div className="social-login">
        <button
          className="form-button facebook-login"
          onClick={handleClickFacebookSignUp}
        >
          <FaFacebookF /> Login with Facebook
        </button>
        <button
          className="form-button google-login"
          onClick={handleClickGoogleSignup}
        >
          <FcGoogle /> Login with Google
        </button>
      </div>
      <p className="form-link">
        Don't have an account?{" "}
        <Link to="/signup" className="text-link">
          Sign Up
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

export default FormLogin;
