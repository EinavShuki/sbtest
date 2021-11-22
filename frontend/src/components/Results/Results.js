import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import "./Results.css";
import { useSelector } from "react-redux";

import images from "../../imageExport";
import Pagination from "../Pagination/Pagination";
import { useEffect } from "react";

const Results = () => {
  //get people state
  const peopleFetch = useSelector((state) => state.peopleFetch);
  const { results } = peopleFetch;

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
        results.people.map((res, index) => (
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
