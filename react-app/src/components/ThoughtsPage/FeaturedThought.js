import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getThoughts } from "../../store/thoughts";

import "./FeaturedThought.css";

//May need to import images.

export default function FeaturedThought() {
  // Array of all the thoughts(recipes)
  const dispatch = useDispatch();
  const allThoughts = useSelector((state) => Object.values(state.allThoughts));

  const totalLengthIndex = allThoughts.length - 1;
  // randomly select an index to show random recipes
  const featuredThought =
    allThoughts[Math.floor(Math.random() * totalLengthIndex)];

  //   console.log(featuredThought);

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  return <div>FeaturedThought</div>;
}
