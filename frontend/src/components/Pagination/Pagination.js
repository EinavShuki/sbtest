import "./Pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updatePage } from "../../actions/peopleActions";

function Pagination() {
  const [pageCount, setPageCount] = useState(1);
  const [pageArray, setPageArray] = useState([]);

  const dispatch = useDispatch();
  const currPage = useSelector((state) => state.updatePage);
  const { page } = currPage;

  const peopleFetch = useSelector((state) => state.peopleFetch);
  const { results } = peopleFetch;

  useEffect(() => {
    if (results && results.people.length) {
      const singePage = results.count <= results.perPage;
      if (singePage && page !== 0) dispatch(updatePage(0));
      const count = singePage ? 1 : Math.ceil(results.count / results.perPage);
      setPageCount(count);

      const arrangeArray = () => {
        if (pageCount < 3) {
          setPageArray(
            singePage ? [0] : Array.from({ length: pageCount }, (v, k) => k)
          );
        } else if (page + 2 < pageCount) {
          setPageArray([Number(page), Number(page) + 1, Number(page) + 2]);
        } else {
          setPageArray([pageCount - 3, pageCount - 2, pageCount - 1]);
        }
      };
      arrangeArray();
    }
  }, [results, pageCount]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    let willPage = 0;
    if (event.target.id === "next") {
      willPage = Number(page) + 1;
    } else if (event.target.id === "previous") {
      willPage = Number(page) - 1;
    } else {
      willPage = event.target.id;
    }

    dispatch(updatePage(Number(willPage)));
  };

  return (
    <div className="Pagination_div">
      {results && results.people.length > 0 && (
        <div className="Pagination_link">
          <button
            disabled={Number(page) === 0}
            id="previous"
            onClick={handlePageClick}
          >{`<<Previous`}</button>
        </div>
      )}

      {pageArray.map((e, index) => (
        <div key={index} className="Pagination_link">
          <button
            id={e}
            onClick={handlePageClick}
            className={page === e ? "current_page" : ""}
          >
            {e + 1}
          </button>
        </div>
      ))}

      {results && results.people.length > 0 && (
        <div className="Pagination_link">
          <button
            disabled={page === pageCount - 1}
            id="next"
            onClick={handlePageClick}
          >{`Next>>`}</button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
