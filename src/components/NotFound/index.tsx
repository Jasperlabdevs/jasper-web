import img from "assets/images/404.svg";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img
        src={img}
        alt="404"
        className="w-80 md:w-[500px] h-auto object-cover"
      />
      <div className="w-56">
        <Button title={"Go Back To Safety"} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default NotFound;
