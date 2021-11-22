import "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Pagination() {
  const dispatch = useDispatch();
  //get page
  const updatePage = useSelector((state) => state.updatePage);
  const { page } = updatePage;
  //get results for total
  const peopleFetch = useSelector((state) => state.peopleFetch);
  const { results } = peopleFetch;

  useEffect(() => {
    console.log(results);
  }, []);

  return <div className="Pagination_div"></div>;
}

export default Pagination;
