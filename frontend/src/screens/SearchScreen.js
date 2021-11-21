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
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  //Here I sould insert redux or usecontext

  return (
    <div className="search_div">
      <Search
        setResults={setResults}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
        page={page}
        setTotal={setTotal}
      />
      {isError !== "" && <ErrorMessage message={isError} />}
      {isLoading ? (
        <Loading />
      ) : (
        <Results results={results} setPage={setPage} total={total} />
      )}
    </div>
  );
};

export default SearchScreen;
