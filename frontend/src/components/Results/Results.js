import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import "./Results.css";

import images from "../../imageExport";

const Results = ({ results }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 50;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(results.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(results.length / itemsPerPage));
  }, [results, itemOffset, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % results.length;

    setItemOffset(newOffset);
  };

  const returnImage = (res) => {
    let endSlice = 6;
    while (res.picture[endSlice].match(RegExp("^[0-9]+$"))) {
      endSlice++;
    }
    const index = Number(res.picture.slice(5, endSlice));
    return images[index - 1];
  };

  const formatAge = (birthday) => {
    return `- ${
      new Date().getFullYear() - new Date(birthday).getFullYear()
    } years old`;
  };

  return (
    <div className="results_grid">
      {currentItems &&
        currentItems.map((res, index) => (
          <div key={index} className="result_info">
            <div className="name_age">
              <h3>
                {res.name} {formatAge(res.birthday)}
              </h3>
            </div>
            {res.phone_number && (
              <h4>
                <a href={`tel:${res.phone_number}`}>
                  <AiFillPhone />
                </a>{" "}
                {res.phone_number}
              </h4>
            )}

            {returnImage(res) ? (
              <img
                alt={res.name}
                src={res.picture === "" ? "" : returnImage(res)}
              />
            ) : (
              <BsFillQuestionDiamondFill className="no_img" />
            )}

            <p style={{ marginBottom: "1rem" }}>{res.address}</p>
          </div>
        ))}
      <ReactPaginate
        className="paginate"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeLinkClassName="paginate_li_active"
        pageLinkClassName="paginate_li"
        previousLinkClassName="paginate_cl"
        nextLinkClassName="paginate_cl"
      />
    </div>
  );
};

export default Results;
