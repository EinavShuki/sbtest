import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDecounce";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../../actions/peopleActions";

const DELAY = 1000;

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  //get page
  const currPage = useSelector((state) => state.updatePage);
  const { page } = currPage;

  const debouncedValue = useDebounce(inputValue, DELAY); //costume hook

  const changeInpute = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchPeopleFunc();
  }, [dispatch, debouncedValue]);

  useEffect(() => {
    fetchPeopleFunc(page);
  }, [page]);

  const fetchPeopleFunc = (currPage = 0) => {
    dispatch(fetchPeople(debouncedValue, currPage));
  };

  return (
    <form className="search_form">
      <input
        autoFocus
        onChange={(e) => changeInpute(e)}
        className="search_input "
        placeholder="Enter name, phone or age"
      />
    </form>
  );
};

export default Search;
