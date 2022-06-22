import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeaturedThought from "./FeaturedThought";
import ThoughtShow from "./ThoughtShow";
import { getThoughts } from "../../store/thoughts";
import { useSelector } from "react-redux";
import "./ThoughtMain.css";
// eslint-disable-next-line
import ThoughtCard from "./ThoughtCard";

export default function ThoughtMain() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  // thoughts array
  // eslint-disable-next-line
  const thoughts = useSelector((state) => Object.values(state.allThoughts));

  return (
    <>
      <div className="main_div">
        <div></div>
        <div className="featured_component_holder">
          <FeaturedThought />
        </div>
        <ThoughtShow />
      </div>
    </>
  );
}
