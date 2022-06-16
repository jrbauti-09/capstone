import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";

import "./CategoryDisplay.css";

export default function CategoryDisplay() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  // we will filter results based on categoryId from search url.
  // Return an array where category matches of the params.
  const filteredResult = useSelector((state) =>
    Object.values(state?.allThoughts).filter((thought) => {
      return thought?.category == categoryId;
    })
  );

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  // Map through filtered array and pass as a prop into ThoughtCard component
  return (
    <div className="main_div_category_container">
      <h1>
        Category: <span>{categoryId}</span>
      </h1>
      {filteredResult.length ? (
        <div className="thought_show_container">
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
