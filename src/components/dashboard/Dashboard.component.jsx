import { useNavigate } from "react-router-dom";

import { logout } from "../../api/AuthApi";
import { useAuth } from "../../contexts";

const Dashboard = () => {
  const { state, dispatch } = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout((val) => {
      dispatch(val);
      navigate("/logout", { replace: true });
    });
  };

  return (
    <div>
      dashboard
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
