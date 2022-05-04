import { useState } from "react";
import FormInput from "../form-input/FormInput.component";
import { login, signupWithFacebook, signupWithGoogle } from "../../api/AuthApi";
import { useAuth } from "../../contexts";

const FormLogin = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(values.email, values.password, (val) => {
      dispatch(val);
      setLoading(false);
    });

    setLoading(true);
  };

  const handleClickFacebookSignUp = (e) => {
    e.preventDefault();

    signupWithFacebook((val) => {
      dispatch(val);
    });
  };

  const handleClickGoogleSignup = (e) => {
    e.preventDefault();
    signupWithGoogle((val) => {
      dispatch(val);
    });
  };

  return (
    <div className="form-login-container">
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
        {/* {errors.password2 ? (
          <p className="form-error">{errors.password2}</p>
        ) : null} */}

        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>

      <div className="social-login">
        <button className="facebook-login" onClick={handleClickFacebookSignUp}>
          Login with Facebook
        </button>
        <button className="google-login" onClick={handleClickGoogleSignup}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default FormLogin;
