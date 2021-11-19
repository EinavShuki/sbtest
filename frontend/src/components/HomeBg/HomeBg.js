import "./HomeBg.css";
import images from "../../imageExport";

images.pop();

const HomeBg = () => {
  return (
    <div className="flex_grid">
      {images.map((img, i) => (
        <img className="col" key={i} src={img} alt="img" />
      ))}
    </div>
  );
};

export default HomeBg;
