import react, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPencil,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

let string =
  "A-I-z-a-S-y-C-w-m-w-T-Q-L-Q-R-J-K-Z-D-H-P-V-3-1-b-o-Z-K-d-S-D-K-z-C-y-Y-p-F-g";

let string2 = string.split("-").join("");

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            `&key=${string2}` +
            "&maxResults=40"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="header">
        <div className="row1">
          <h1 className="header_books">
            Find your inspiration
            <br /> for your next thought.
          </h1>
        </div>
        <div className="row2">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Search For A Recipe Book Here.."
              className="search_input_book"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
            <div className="search_button_book">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <img src="./images/bg2.png" alt="" />
        </div>
      </div>

      <div className="container">{<Card book={bookData} />}</div>
    </>
  );
};
export default Main;
