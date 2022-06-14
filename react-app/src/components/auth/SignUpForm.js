import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
        // console.log(errors);
        return;
      } else {
        history.push("/");
      }
    } else {
      return setErrors(["Passwords do not match."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_main_container">
      <form onSubmit={onSignUp} className="login_form">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="input_container">
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            className="login_input"
            placeholder="Username"
            required
          ></input>
        </div>
        <div className="input_container">
          <input
            type="email"
            name="email"
            onChange={updateEmail}
            value={email}
            className="login_input"
            required
            placeholder="Email"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            className="login_input"
            value={password}
            placeholder="Password"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            className="login_input"
            required={true}
            placeholder="Confirm Password"
          ></input>
        </div>
        <button type="submit" className="submit_button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
