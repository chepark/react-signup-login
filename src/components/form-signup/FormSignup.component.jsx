import { useState } from "react";
import FormInput from "../form-input/FormInput.component";
import {
  signup,
  signupWithFacebook,
  signupWithGoogle,
} from "../../api/AuthApi";
import { useAuth } from "../../contexts";

const FormSignup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(values.email, values.password, (val) => {
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
    <div className="form-signup-container">
      <form className="form-signup" noValidate onSubmit={handleSubmit}>
        <FormInput
          label="User Name"
          type="text"
          required
          name="username"
          value={values.username}
          onChange={handleChange}
        />
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
        <FormInput
          label="Password2"
          type="text"
          required
          name="password2"
          value={values.password2}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      <div className="social-signup">
        <button className="facebook-signup" onClick={handleClickFacebookSignUp}>
          Sign Up with Facebook
        </button>
        <button className="google-signup" onClick={handleClickGoogleSignup}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default FormSignup;
