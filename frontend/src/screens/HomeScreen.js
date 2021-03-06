import { useNavigate } from "react-router-dom"; //replace useHistory in this version
import "../index.css";
import HomeBg from "../components/HomeBg/HomeBg";

const HomeScreen = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/search");
  };

  return (
    <div className="home_div">
      <HomeBg />
      <button onClick={clickHandler} className="start_btn">
        Click Here To Find A Person Details
      </button>
    </div>
  );
};

export default HomeScreen;
