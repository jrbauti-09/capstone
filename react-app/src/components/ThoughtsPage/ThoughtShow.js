import React from "react";
import { useSelector } from "react-redux";
import ThoughtCard from "./ThoughtCard";

import "./ThoughtShow.css";

export default function ThoughtShow() {
  const thoughts = useSelector((state) => Object.values(state.allThoughts));

  //   console.log(thoughts);

  return (
    <>
      <div className="thought_show_container">
        {thoughts?.map((thought) => {
          return (
            <>
              <ThoughtCard key={thought?.id} thought={thought} />
            </>
          );
        })}
      </div>
    </>
  );
}
