import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not_found_div">
      <h2>Woops, we cannot find that page</h2>
      <Link to="/search">Back To Search Page</Link>
    </div>
  );
}

export default NotFound;
