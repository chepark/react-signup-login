import useForm from "../useForm.hook";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-input-container">
      {label && (
        <label className="form-label" htmlFor={label}>
          {label}
        </label>
      )}
      <input className="form-input" {...otherProps} />
    </div>
  );
};

export default FormInput;
