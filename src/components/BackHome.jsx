import mare from "../img/Vista-mare.jpg";
import montagna from "../img/montagna.jpg";
import profilo1 from "../img/My Foto.jpg";
import mont from "../img/mont.jpg";

const BackHome = function () {
  return (
    <div className="cont">
      <div className="profile-wrapper">
        <div className="profile">
          <div>
            <img src={profilo1} alt="" />
            <h4 className="text-white mt-1">Welcome</h4>
            <h6 className="text-white">By Innocenzo Merola</h6>
          </div>
        </div>
      </div>
      <div className="img1">
        <img src={montagna} alt="montagna" />
      </div>
      <div className="img2">
        <img src={mare} alt="mare" />
      </div>
      <div className="img3">
        <img src={mont} alt="montagna" />
      </div>
    </div>
  );
};

export default BackHome;
