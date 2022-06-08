import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LandingView from "../LandingView/LandingView";

import "./LandingPage.css";

export default function LandingPage({ status }) {
  return (
    <div className="landing-main-div">
      <LandingView status={status} />
    </div>
  );
}
