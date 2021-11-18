import img1 from "../../images/image1.png";
import img2 from "../../images/image2.png";
import img3 from "../../images/image3.png";
import img4 from "../../images/image4.png";
import img5 from "../../images/image5.png";
import img6 from "../../images/image6.png";
import img7 from "../../images/image7.png";
import img8 from "../../images/image8.png";
import img9 from "../../images/image9.png";
import "./HomeBg.css";
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const HomeBg = () => {
  return (
    <div className="flex_grid">
      {images.map((img, i) => (
        <img className="col" key={i} src={img} rel="img" />
      ))}
    </div>
  );
};

export default HomeBg;
