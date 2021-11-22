import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDecounce";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../actions/peopleActions";

const DELAY = 750;
const phoneRegex =
  /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const nameRegex = /[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*/;

const Search = () => {
  const [invalidSearch, setInvalidSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  //get page
  const updatePage = useSelector((state) => state.updatePage);
  const { page } = updatePage;

  const debouncedValue = useDebounce(inputValue, DELAY); //costume hook

  const changeInpute = (e) => {
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
    fetchPeopleFunc();
  }, [dispatch, debouncedValue, page]);

  const fetchPeopleFunc = () => {
    const name = debouncedValue.match(nameRegex)?.[0].trim();
    const phone = debouncedValue.match(phoneRegex)?.[0].trim();
    const age =
      debouncedValue.replace(nameRegex, "").replace(phoneRegex, "").trim() ||
      null;

    if (invalidSearch === "") {
      dispatch(fetchPeople(name, phone, age, page));
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
