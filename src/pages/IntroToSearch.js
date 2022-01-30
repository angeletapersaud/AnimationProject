import PonyoGIF from "../images/IntroToSearchPageImage/PonyoGIF.gif";
import { Link } from "react-router-dom";

function IntroToSearch() {
  return (
    <div id="IntroToSearchPGContainer">
      <div>
        <div id="IntroToSearch-Img">
          <img src={PonyoGIF} alt="" height="700" width="1240" />
        </div>
      </div>
      <div>
        <Link to="/search/StudioGhibliSearch">
          <button id="IntroToSearchPgBtn">Click here to Begin Search</button>
        </Link>
      </div>
    </div>
  );
}

export default IntroToSearch;
