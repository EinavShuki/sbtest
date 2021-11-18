import axios from "axios";
import "../index.css";
import { useEffect, useState } from "react";
const Search = () => {
  const [invalidLetters, setInvalidLetters] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    //debounced
    setTimeout(() => {
      clearTimeout();
      if (inputVal === "") {
        //all
      } else {
        const regex = new RegExp("^[0-9]+$");
        if (inputVal.trim()[0] === "(") console.log("Phone");
        else if (inputVal.trim()[0].match(regex))
          console.log("age compute needed");
        else console.log("name");
      }
    }, 0.5);
    setQuery("Lou Gardner");
  };

  const changeInpute = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchPeople = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        let res = axios.get(
          "/api/getAllPeople",
          { cancelToken: source.token, config },
          { name: "Lou Gardner" }
        );
        console.log(`res`, res);
      } catch (err) {
        console.error(`err`, err);
      }
    };
    fetchPeople();
    return () => {
      source.cancel("Cancelling in cleanup in Search");
    };
  }, [query]);
  return (
    <div className="search_div">
      <form className="search_form">
        <input
          autoFocus
          onChange={(e) => changeInpute(e)}
          className={
            "search_input " + (invalidLetters !== "" ? "wrong_input" : "")
          }
        />
        <button onClick={(e) => searchHandler(e)} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
