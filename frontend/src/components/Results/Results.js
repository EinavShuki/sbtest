import "Results.css";
const Results = () => {
  return (
    <div className="results_grid zoomIn">
      {results.map((res, index) => (
        <div className="result_info">
          <img
            alt={res.name}
            src={
              res.picture === ""
                ? "https://placehold.it/198x264&text=Image+Not+Found"
                : res.picture
            }
          />
          <p style={{ marginBottom: "1rem" }}>{movie.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
