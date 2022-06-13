import React, { useEffect, useState } from "react";
import "./SearchDisplay.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";

export default function SearchEmpty() {
  const dispatch = useDispatch();
  const thoughts = useSelector((state) => Object.values(state.allThoughts));
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);
  return (
    <div className="search-container">
      <h1 style={{ marginLeft: "0.2em" }}>
        Search result for: <span>{""}</span>
      </h1>
      <div className="thought-show-container">
        {thoughts?.map((thought) => {
          return (
            <>
              <ThoughtCard key={thought?.id} thought={thought} />
            </>
          );
        })}
      </div>
    </div>
  );
}
