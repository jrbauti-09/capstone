/* eslint-disable */
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
    window.alert("Please login to use the search feature.");
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
              Food For Thought.
            </Link>
          </div>
          <div className="search-bar-container">
            <div className="padding_logo">
              <div className="inner_padding_logo"></div>
            </div>
            <div></div>
            <form className="search_bar" onSubmit={submitProxySearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mag"
              />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for thoughts to make food.."
                className="search_bar_input"
              />
            </form>
          </div>
          <div className="landing_nav_bar">
            <div className="tab">
              <button className="tab_down">
                ABOUT ME<i className="tab_icon"></i>
              </button>
              <div className="bottom_container">
                <a
                  href="https://github.com/jrbauti-09/capstone"
                  target="_blank"
                  rel="noreferrer"
                  className="repository"
                >
                  Repository
                </a>
                <a
                  href="https://www.linkedin.com/in/joshua-raphael-bautista-8a019a11b/"
                  target="_blank"
                  rel="noreferrer"
                  className="linked_in"
                >
                  Linkedin
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
            <form className="search_bar" onSubmit={handleSearch}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-mag"
              />
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="search_bar_input"
                placeholder="Search for thoughts to make food.."
              />
            </form>
          </div>
          <div className="landing_nav_bar">
            <div className="tab">
              <Link to="/books/">
                <button className="tab_down">
                  Search for a recipe<i className="tab_icon"></i>
                </button>
              </Link>
            </div>
            <div className="tab">
              <Link to="/thoughts/add">
                <button className="tab_down">
                  Share a thought!<i className=""></i>
                </button>
              </Link>
            </div>
            <div className="tab">
              <Link to="/my-thoughts">
                {" "}
                <button className="tab_down">
                  My thoughts<i className="tab_icon"></i>
                </button>
              </Link>
            </div>
            <div className="tab">
              <button className="tab_down">
                Categories<i className="tab_icon"></i>
              </button>
              <div className="bottom_container">
                <Link to="/categories/Breakfast">Breakfast</Link>
                <Link to="/categories/Dinner">Dinner</Link>
                <Link to="/categories/Lunch">Lunch</Link>
                <Link to="/categories/Beverages">Beverages</Link>
                <Link to="/categories/Dessert">Dessert</Link>
              </div>
            </div>
            <div className="tab">
              <button className="tab_down">
                ABOUT ME<i className="tab_icon"></i>
              </button>
              <div className="bottom_container">
                <a
                  href="https://github.com/jrbauti-09/capstone"
                  target="_blank"
                  rel="noreferrer"
                  className="repository"
                >
                  Repository
                </a>
                <a
                  href="https://www.linkedin.com/in/joshua-raphael-bautista-8a019a11b/"
                  target="_blank"
                  rel="noreferrer"
                  className="linked_in"
                >
                  Linkedin
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
