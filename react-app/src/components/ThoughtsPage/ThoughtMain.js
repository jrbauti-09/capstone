import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeaturedThought from "./FeaturedThought";
import ThoughtShow from "./ThoughtShow";
import { getThoughts } from "../../store/thoughts";
import "./ThoughtMain.css";

export default function ThoughtMain() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);
  return (
    <>
      <div className="main_div">
        <div className="featured_component_holder">
          <FeaturedThought />
        </div>
        <ThoughtShow />
      </div>
    </>
  );
}
