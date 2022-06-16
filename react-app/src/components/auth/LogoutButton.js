import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
