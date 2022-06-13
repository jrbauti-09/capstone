import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../../store/session";
import { useDispatch } from "react-redux";
import {
  // eslint-disable-next-line
  faCaretSquareDown,
  // eslint-disable-next-line
  faBars,
  // eslint-disable-next-line
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./NavigationBar.css";

export default function NavigationBar({ status }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const submitProxySearch = (e) => {
    e.preventDefault();
    // set the search value to blank string since user is not logged in.
    setSearchValue("");
    history.push("/login");
  };

  const logOut = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${searchValue}`);
    setSearchValue("");
  };

  if (status === "user-not-logged") {
    return (
      <div className="landing-log">
        <div className="landing">
          <div className="logo-here">
            <Link to="/">LOGO HERE</Link>
          </div>
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={submitProxySearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="magnifying-glass"
              />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for thoughts to make food.."
                className="search-bar-input"
              />
            </form>
          </div>
          <div className="landing-navigation">
            <div className="drop">
              <button className="about-drop">
                ABOUT ME<i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
                <a
                  href="https://github.com/jrbauti-09/capstone"
                  target="_blank"
                  rel="noreferrer"
                  className="repository"
                >
                  Repository
                </a>
              </div>
            </div>
            <Link className="login_btn" to="/login">
              LOG IN
            </Link>
            <Link className="signup_btn" to="/signup">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "user-is-logged") {
    return (
      <div className="landing-log">
        <div className="landing">
          <div className="logo-here">
            <Link to="/">LOGO HERE</Link>
          </div>
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={handleSearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="magnifying-glass"
              />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for thoughts to make food.."
                className="search-bar-input"
              />
            </form>
          </div>
          <div className="landing-navigation">
            <div className="drop">
              <Link to="/thoughts/add">
                <button className="about-drop">
                  Share a thought!<i className="fa fa-caret-down"></i>
                </button>
              </Link>
            </div>
            <div className="drop">
              <button className="about-drop">
                Categories<i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
                <a
                  href="https://github.com/jrbauti-09/capstone"
                  target="_blank"
                  rel="noreferrer"
                  className="repository"
                >
                  categories
                </a>
              </div>
            </div>
            <div className="drop">
              <button className="about-drop">
                ABOUT ME<i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
                <a
                  href="https://github.com/jrbauti-09/capstone"
                  target="_blank"
                  rel="noreferrer"
                  className="repository"
                >
                  Repository
                </a>
              </div>
            </div>
            <div className="signup_btn" onClick={logOut}>
              LOGOUT
            </div>
          </div>
        </div>
      </div>
    );
  }
}
