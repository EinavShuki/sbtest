import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../../hooks/useDecounce";
const DELAY = 500;
const phoneRegex =
  /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const nameRegex = /[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*/;

const Search = ({ setResults, setIsLoading }) => {
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, DELAY); //costume hook

  const changeInpute = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchPeople(source);
    return () => {
      source.cancel("Cancelling in cleanup in Search");
    };
  }, [debouncedValue]);

  const fetchPeople = async (source) => {
    const name = debouncedValue.match(nameRegex)?.[0].trim();
    const phone = debouncedValue.match(phoneRegex)?.[0].trim();
    const age =
      debouncedValue.replace(nameRegex, "").replace(phoneRegex, "").trim() ||
      null;

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/", {
        params: { name, phone, age },
        cancelToken: source.token,
        config,
      });

      setResults(data);
    } catch (err) {
      console.error(`err`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form className="search_form">
      <input
        autoFocus
        onChange={(e) => changeInpute(e)}
        className={"search_input " + (invalidSearch ? "wrong_input" : "")}
      />
      <button onClick={(e) => searchHandler(e)} type="submit">
        <FiSearch />
      </button>
    </form>
  );
};

export default Search;
