import { useEffect, useState } from "react";
import FormSignup from "../form-signup/FormSignup.component";
import FormSuccess from "../form-success/FormSuccess.component";
import useForm from "../useForm.hook";

const FormDisplay = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="form-display">
      {/* !Display signup, login or success */}
      {!submitted ? <FormSignup formSubmitted={setSubmitted} /> : "success"}
    </div>
  );
};

export default FormDisplay;
