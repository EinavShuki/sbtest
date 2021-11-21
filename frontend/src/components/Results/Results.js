import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import "./Results.css";

import images from "../../imageExport";
import Pagination from "../Pagination/Pagination";

const Results = ({ results, setPage, total }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setPageCount(results ? total / results.length : 0);
  }, [total]);

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   setCurrentItems(results.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(results.length / itemsPerPage));
  // }, [results, itemOffset, itemsPerPage]);

  // const handlePageClick = (e) => {
  //   console.log(e);

  // };

  let forcePageObj = {};
  const handlePageClick = (e) => {
    setPage(e.selected);
    if (e.selected === 0) {
      forcePageObj["forcePage"] = 3;
    }
    const newOffset = e.selected * results.length;
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
      {results &&
        results.map((res, index) => (
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
      <Pagination />
    </div>
  );
};

export default Results;
