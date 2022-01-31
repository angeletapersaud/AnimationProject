import { Link } from "react-router-dom";
import React from "react";

function ThankYouPage() {
  return (
    <div id="ThankYouPGContainer">
      <div id="OuterHomeContainer">
        <div id="RtnHomeContainer">
          <h1>
            Thank you for signing up! Please confirm your email when
            confirmation is received.
          </h1>
          <div>
            <Link to="/overview">
              <button id="ReturnHomeBtn">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
