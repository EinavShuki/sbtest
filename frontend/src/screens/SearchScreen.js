import axios from "axios";
import "../index.css";
import { useState } from "react";
import Results from "../components/Results/Results";
import Search from "../components/Search/Search";

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="search_div">
      <Search setResults={setResults} setIsLoading={setIsLoading} />
      {isLoading ? <div>Loading...</div> : <Results results={results} />}
    </div>
  );
};

export default SearchScreen;
