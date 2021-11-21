import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDecounce";
import "./Search.css";
const DELAY = 750;
const phoneRegex =
  /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const nameRegex = /[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*/;

const Search = ({ setResults, setIsLoading, setIsError, page, setTotal }) => {
  const [invalidSearch, setInvalidSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, DELAY); //costume hook

  const changeInpute = (e) => {
    setIsError("");
    setInputValue(e.target.value);
    validateInput(e.target.value);
  };

  const validateInput = (input) => {
    const phone = input.match(phoneRegex)?.[0].trim();
    const age =
      input.replace(nameRegex, "").replace(phoneRegex, "").trim() || null;
    setInvalidSearch("");

    if (age && (!parseInt(age) || parseInt(age) > 125 || parseInt(age) < 0)) {
      setInvalidSearch("Age is not valid");
    }
    if (
      phone &&
      phone.split("").filter((x) => Number.isInteger(parseInt(x))).length > 10
    ) {
      setInvalidSearch("Invalid phone number");
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchPeople(source);
    return () => {
      source.cancel("Cancelling in cleanup in Search");
    };
  }, [debouncedValue, page]);

  const fetchPeople = async (source) => {
    const name = debouncedValue.match(nameRegex)?.[0].trim();
    const phone = debouncedValue.match(phoneRegex)?.[0].trim();
    const age =
      debouncedValue.replace(nameRegex, "").replace(phoneRegex, "").trim() ||
      null;

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    if (invalidSearch === "") {
      try {
        setIsLoading(true);

        const { data } = await axios.get("/api/", {
          params: { name, phone, age, page },
          cancelToken: source.token,
          config,
        });
        if (!data.people.length) setIsError("Could not find any match results");

        setResults(data.people);
        setTotal(data.count);
      } catch (err) {
        console.error(`err`, err);
        setIsError("Could not find any match results");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="search_form">
      <input
        autoFocus
        onChange={(e) => changeInpute(e)}
        className={
          "search_input " + (invalidSearch.length ? "wrong_input" : "")
        }
        placeholder="Enter name, phone or age"
      />

      {invalidSearch !== "" && <div className="error_msg">{invalidSearch}</div>}
    </form>
  );
};

export default Search;
