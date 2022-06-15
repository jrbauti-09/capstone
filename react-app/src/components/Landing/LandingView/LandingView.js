import React from "react";

import { Link } from "react-router-dom";

//import our css
import "./LandingView.css";

// Will import auth validators.
import SignUpForm from "../../auth/SignUpForm";
import LoginForm from "../../auth/LoginForm";
import logo from "../../images/Food for thought (1).png";

export default function LandingView({ status }) {
  //If the value of status is default then we load our default landing page.
  // TODO **** import logo.
  if (status === "default") {
    return (
      <div className="landing_view_container">
        <div className="landing_view_content">
          {/* <div className="side_left"></div> */}

          <div className="side_right">
            <div className="side_right_inner_content">
              {/* <img alt="landing logo" src={logo} /> */}
              {/* <div className="logo_div_container">
                <img src={logo} alt="logo"></img>
              </div> */}
              <h2 className="upper">Let's get thinking.</h2>
              {/* <h1 className="middle">Food For Thought</h1> */}
              <p className="bottom">
                "To a hungry person every bitter food is as sweet as can be.
                When the preferable is not available, the available becomes
                preferable!" - Israelmore Ayivor
                <br></br>
              </p>
              <Link className="landing_view_buttons" to="/login">
                LOG IN
              </Link>
              <Link className="landing_view_buttons" to="/signup">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //If status is userLogin then we load with login form.
  if (status === "user-login") {
    return (
      <div className="landing_view_container">
        <div className="landing_view_content">
          <div className="side_left"></div>

          <div className="side_right">
            <div className="side_right_inner_content login-right">
              {/* <div>
                <img src={logo} alt="logo"></img>
              </div> */}
              <p className="login_header_main">Log in for Thoughts</p>
              <p className="signup_p">
                <Link className="login_header" to="/signup">
                  Don't have an account?{" "}
                </Link>{" "}
                Sign up to share your Thoughts.{" "}
              </p>
              {/* <img alt="landing logo" src={logo} /> */}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  //If status is userSignUp then we load with signup form.

  if (status === "userSignUp") {
    return (
      <div className="landing_view_container">
        <div className="landing_view_content">
          <div className="side_left"></div>

          <div className="side_right">
            <div className="right-info-container">
              {/* <img alt="landing logo" src={logo} /> */}
              <p className="p-log-heading">Sign Up for Thoughts</p>
              <p className="log-heading-p">
                Already have an account?{" "}
                <Link className="log-heading" to="/login">
                  LOG IN
                </Link>
              </p>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
