/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./SearchDisplay.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";

export default function SearchDisplay() {
  const dispatch = useDispatch();
  const thoughts = useSelector((state) => Object.values(state.allThoughts));
  const { searchId } = useParams();

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  let search = searchId;

  // if the search includes spaces then we split by spaces to its individual elements.

  if (search.split(" ")) {
    search = search.split(" ");
  }

  const queryResult = thoughts?.filter((thought) => {
    for (let i = 0; i < search.length; i++) {
      // word and name to lower case so comparison is case insensitive.
      let word = search[i].toLowerCase();
      let name = thought?.name.toLowerCase();
      // if the word is included in the name of the thought then we return that thought to the filtered array.
      if (name.includes(word)) {
        return thought;
      }
    }
  });

  // We pass the filtered Array into our ThoughtCard component.

  return (
    <div className="main_div_category_container">
      <h1>
        Search result for: <span>{searchId}</span>
      </h1>
      {queryResult?.length ? (
        <div className="thought_show_container">
          {queryResult?.map((thought) => {
            return (
              <>
                <ThoughtCard key={thought?.id} thought={thought} />
              </>
            );
          })}
        </div>
      ) : (
        <div>No results found for {searchId}</div>
      )}
    </div>
  );
}
