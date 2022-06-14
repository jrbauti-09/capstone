import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThoughts } from "../../../store/thoughts";
import ThoughtCard from "../../ThoughtsPage/ThoughtCard";
import { Link, useHistory } from "react-router-dom";

export default function MyThoughts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  // const user = useSelector((state) => state.session.user);
  const myThoughts = useSelector((state) =>
    Object.values(state.allThoughts).filter((thought) => {
      return thought?.user_id == userId;
    })
  );

  // if (!user) {
  //   history.push("/");
  // }

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  return (
    <div className="search-container">
      <h1>
        My Thoughts: <span>{myThoughts?.length}</span>
      </h1>
      {myThoughts.length ? (
        <div className="thought-show-container">
          {myThoughts.map((thought) => {
            return (
              <>
                <ThoughtCard key={thought?.id} thought={thought} />
              </>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>
            No thoughts yet..{" "}
            <Link to="/thoughts/add">
              <span>Post a thought here.</span>
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
}
