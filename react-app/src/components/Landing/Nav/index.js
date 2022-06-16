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

import logo from "../../images/Food for thought (1).png";

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
            <Link to="/" className="image_logo">
              {/* <img src={logo} alt="logo" className="image_logo"></img> */}
              {/* <h3 className="header_food_for_thought">Food For Thought.</h3> */}
              Food For Thought.
            </Link>
          </div>
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={submitProxySearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mag"
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
            <Link to="/" className="image_logo_">
              {/* <img src={logo} alt="logo" className="image_logo"></img> */}
              Food For Thought.
            </Link>
          </div>
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={handleSearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mag"
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
              <Link to="/books/">
                <button className="about-drop">
                  Search for a recipe<i className="fa fa-caret-down"></i>
                </button>
              </Link>
            </div>
            <div className="drop">
              <Link to="/thoughts/add">
                <button className="about-drop">
                  Share a thought!<i className=""></i>
                </button>
              </Link>
            </div>
            <div className="drop">
              <Link to="/my-thoughts">
                {" "}
                <button className="about-drop">
                  My thoughts<i className="fa fa-caret-down"></i>
                </button>
              </Link>
            </div>
            <div className="drop">
              <button className="about-drop cat-button">
                Categories<i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-container">
                <Link to="/categories/Breakfast">Breakfast</Link>
                <Link to="/categories/Dinner">Dinner</Link>
                <Link to="/categories/Lunch">Lunch</Link>
                <Link to="/categories/Beverages">Beverages</Link>
                <Link to="/categories/Dessert">Dessert</Link>
              </div>
            </div>
            <div className="drop">
              <button className="about-drop cat-button">
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
