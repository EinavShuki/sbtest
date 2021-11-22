import "../index.css";
import { useEffect } from "react";
import Results from "../components/Results/Results";
import Search from "../components/Search/Search";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  //get people state
  const peopleFetch = useSelector((state) => state.peopleFetch);
  const { loading, error } = peopleFetch;

  return (
    <div className="search_div">
      <Search />
      {error && <ErrorMessage message={error} />}
      {loading ? <Loading /> : <Results />}
    </div>
  );
};

export default SearchScreen;
