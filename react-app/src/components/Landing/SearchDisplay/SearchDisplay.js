import React, { useEffect, useState } from "react";
import "./SearchDisplay.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";

export default function SearchDisplay() {
  const { searchId } = useParams();
  const dispatch = useDispatch();
  const thoughts = useSelector((state) => Object.values(state.allThoughts));

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  let search = searchId;

  // if the search includes spaces then we split by spaces to its individual elements.

  // if (!search.includes(" ")) {
  //   search = [search];
  //   // console.log(search);
  // } else {
  //   search = search.split(" ");
  //   // console.log(search);
  // }

  if (search.split(" ")) {
    search = search.split(" ");
  } else {
    search = [search];
  }

  const queryResult = thoughts?.filter((thought) => {
    for (let i = 0; i < search.length; i++) {
      let word = search[i].toLowerCase();
      let name = thought?.name.toLowerCase();
      if (name.includes(word)) {
        return thought;
      }
    }
  });

  // We pass the filtered Array into our ThoughtCard component.

  return (
    <div className="search-container">
      <h1>
        Search result for: <span>{searchId}</span>
      </h1>
      {queryResult.length ? (
        <div className="thought-show-container">
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
