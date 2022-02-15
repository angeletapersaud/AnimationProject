import MyNeighborTotoroGIF from "../images/AboutUsPageImages/MyNeighborTotoroGIF.gif";
import SpiritedAwayGIF from "../images/AboutUsPageImages/SpiritedAwayGIF.gif";
import KikisDeliveryService from "../images/AboutUsPageImages/KikisDeliveryService.gif";

function AboutUs() {
  return (
    <div>
      <div id="AboutPg">
        <div id="AboutUsTitle">
          <h1>Hover for details...</h1>
        </div>
        <div className="AboutUsContainer">
          <div className="card">
            <div className="imgBx">
              <img src={SpiritedAwayGIF} alt="" height="540" width="540" />
            </div>
            <div className="content">
              <h2>Who We Are</h2>
              <p>
                This website was created for those who have an interest in
                animation.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={KikisDeliveryService} alt="" height="540" width="540" />
            </div>
            <div className="content">
              <h2>Search Animations</h2>
              <p>
                {" "}
                Whether you need a little refresher regarding a specific
                animation, or if you are in need of full details you have come
                to the right place. You will get access to any information that
                you may need for free.{" "}
              </p>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={MyNeighborTotoroGIF} alt="" height="540" width="540" />
            </div>
            <div className="content">
              <h2>Easy sign up for alerts!</h2>
              <p>
                {" "}
                We encourage you to sign up for alerts! Be the first to know of
                any animation updates from our site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
