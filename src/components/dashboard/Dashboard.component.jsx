import "./_dashboard.styles.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout, updateUserEmail, updateUserProfile } from "../../api";
import { useAuth } from "../../contexts";
import FormInput from "../form-input/FormInput.component";

const Dashboard = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();

  const { state, dispatch } = useAuth();
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    setValues({ username: user.displayName, email: user.email });
  }, []);

  const handleLogout = () => {
    logout((val) => {
      dispatch(val);
      navigate("/logout", { replace: true });
    });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    if (user.email !== values.email) {
      updateUserEmail(values.email);
    }

    if (user.displayName !== values.username) {
      updateUserProfile(values.username);
    }

    // change auth context.
    // dispatch UPDATE_PROFILE
    setEdit(false);
  };

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setValues({ ...values, username: e.target.value });
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setValues({ ...values, email: e.target.value });
    console.log(values);
  };

  const renderDefaultMode = () => {
    return (
      <>
        <div className="dashboard-profile">
          <p>User Name:</p>
          <p>{values.username}</p>
        </div>
        <div className="dashboard-profile">
          <p>Email:</p>
          <p>{values.email}</p>
        </div>
        <button onClick={handleEdit}>Edit</button>
      </>
    );
  };

  const renderEditMode = () => {
    return (
      <>
        {values && (
          <FormInput
            label="User Name"
            type="text"
            required
            name="username"
            value={values.username}
            onChange={handleUserNameChange}
          />
        )}
        {values && (
          <FormInput
            label="Email"
            type="text"
            required
            name="email"
            value={values.email}
            onChange={handleEmailChange}
          />
        )}
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Dashboard</h2>

      {!edit && values && values.username && renderDefaultMode()}
      {edit && renderEditMode()}
      <button className="dashboard-logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
