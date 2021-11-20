import "../index.css";
import { useState } from "react";
import Results from "../components/Results/Results";
import Search from "../components/Search/Search";
import Loading from "../components/Loading/Loading";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  return (
    <div className="search_div">
      <Search
        setResults={setResults}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
      {isError !== "" && <ErrorMessage message={isError} />}
      {isLoading ? <Loading /> : <Results results={results} />}
    </div>
  );
};

export default SearchScreen;
