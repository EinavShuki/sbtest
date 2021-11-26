import "./Pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updatePage } from "../../actions/peopleActions";

function Pagination() {
  const [pageCount, setPageCount] = useState(1);

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
    <>
      {results && results.people.length > 0 && (
        <div className="Pagination_div">
          <div className="Pagination_link">
            <button
              disabled={Number(page) === 0}
              id="previous"
              onClick={handlePageClick}
            >{`<<Previous`}</button>
          </div>

          {Number(page) !== 0 && (
            <div className="Pagination_link">
              <button id={page - 1} onClick={handlePageClick}>
                {page}
              </button>
            </div>
          )}

          <div className="Pagination_link">
            <button
              id={page}
              onClick={handlePageClick}
              className="current_page"
            >
              {page + 1}
            </button>
          </div>

          {page !== pageCount - 1 && page + 1 !== pageCount - 1 && (
            <div className="Pagination_link">
              <button id={page + 1} onClick={handlePageClick}>
                {page + 2}
              </button>
            </div>
          )}

          {page !== pageCount - 1 && (
            <div className="Pagination_link">
              ...
              <button id={pageCount - 1} onClick={handlePageClick}>
                {pageCount}
              </button>
            </div>
          )}

          <div className="Pagination_link">
            <button
              disabled={page === pageCount - 1}
              id="next"
              onClick={handlePageClick}
            >{`Next>>`}</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
