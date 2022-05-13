import "./_dashboard.styles.scss";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts";
import { UPDATE_RESET } from "../../reducers/types";

import {
  deleteProfilePhoto,
  getProfilePhotoURL,
  imageDirectory,
  logout,
  updateProfileImage,
  updateUserEmail,
  updateUserDisplayName,
  updateUserPhotoURL,
} from "../../api";

import FormInput from "../form-input/FormInput.component";
import AlertMessage from "../alertMessage/AlertMessage.component";
import { SliderValueLabelUnstyled } from "@mui/base";

const Dashboard = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();

  const { state, dispatch } = useAuth();
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL || "../../assets/images/profileIcon.png",
    });
  }, []);

  const handleLogout = () => {
    logout((val) => {
      dispatch(val);
      navigate("/logout", { replace: true });
    });
  };

  const handleCancel = () => {
    setValues({
      username: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });

    deleteProfilePhoto(imageDirectory.temporary, user.uid);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    if (user.email !== values.email) {
      updateUserEmail(
        values.email,
        (val) => {
          dispatch(val);
          setLoading(false);
        },
        setValues
      );
    }

    if (user.displayName !== values.username) {
      updateUserDisplayName(values.username, (val) => {
        dispatch(val);
        setLoading(false);
      });
    }

    if (user.photoURL !== values.photoURL) {
      updateUserPhotoURL(values.photoURL, (val) => {
        dispatch(val);
        setLoading(false);
      });
    }

    dispatch({ type: UPDATE_RESET }); //Set updateError to ""(Empty string.)
    setLoading(true);
    setEdit(false);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();

    const newPhotoURL = await getProfilePhotoURL(
      user.uid,
      imageDirectory.temporary,
      e.target.files[0]
    );

    setValues({ ...values, photoURL: newPhotoURL });
    // console.log(values.photoURL);
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
        <div className="dashboard-profile" id="avatar-container">
          <img className="avatar" src={user.photoURL} alt="avatar" />
        </div>
        <div className="dashboard-profile">
          <p>User Name:</p>
          <p>{user.displayName}</p>
        </div>
        <div className="dashboard-profile">
          <p>Email:</p>
          <p>{user.email}</p>
        </div>
        <button onClick={handleEdit}>Edit</button>
      </>
    );
  };

  const renderEditMode = () => {
    return (
      <>
        {values && (
          <div className="dashboard-profile" id="avatar-container">
            <img className="avatar" src={values.photoURL} alt="avatar" />
            <div className="avatar-btn">
              <img
                src={require("../../assets/images/camera.png")}
                alt="change avatar"
              />
              <input
                type="file"
                className="avatar-input"
                onChange={handleImageChange}
              />
            </div>
          </div>
        )}
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
        {values && values.email && (
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
      {!edit && state.updateError && (
        <AlertMessage message={state.updateError} />
      )}
      {!edit && user && renderDefaultMode()}
      {/* {!edit && values && values.username && renderDefaultMode()} */}
      {edit && renderEditMode()}
      <button className="dashboard-logout" onClick={handleLogout}>
        Log Out
      </button>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default Dashboard;
