import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";

import "./CategoryDisplay.css";

export default function CategoryDisplay() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  // we will filter results based on categoryId from search url.

  const filteredResult = useSelector((state) =>
    Object.values(state?.allThoughts).filter((thought) => {
      return thought?.category == categoryId;
    })
  );

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  return (
    <div className="search-container">
      <h1>
        Category: <span>{categoryId}</span>
      </h1>
      {filteredResult.length ? (
        <div className="thought-show-container">
          {filteredResult?.map((thought) => {
            return (
              <>
                <ThoughtCard key={thought?.id} thought={thought} />
              </>
            );
          })}
        </div>
      ) : (
        <div>No thoughts in this category yet..</div>
      )}
    </div>
  );
}
