import React, { useState } from "react";
import { Link } from "react-router-dom";

function Connect() {
  //states
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  let [phonenumber, setPhonenumber] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [reenterpassword, setReenterpassword] = useState("");
  let [submitted, setSubmitted] = useState(false);

//handle any change to input boxes
  const handleChange = (event) => {
    if (event.target.id === "firstname") {
      setFirstname(event.target.value);
    } else if (event.target.id === "lastname") {
      setLastname(event.target.value);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "phonenumber") {
      setPhonenumber(event.target.value);
    } else if (event.target.id === "username") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    } else {
      setReenterpassword(event.target.value);
    }
  };

  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted((prevSubmitted) => true);
  };

  return (
    <div id="ConnectPgContainer">
      <div id="Connect-Page">
        <div id="formcontainer">
          <form onSubmit={handleSubmit} className="cf">
            <h2>SIGN UP FORM</h2>
            <label className="form-label" htmlFor="firstname">
              First Name:
            </label>
            <input id="firstname" onChange={handleChange} value={firstname} />

            <label className="form-label" htmlFor="lastname">
              Last Name:
            </label>
            <input id="lastname" onChange={handleChange} value={lastname} />

            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              onChange={handleChange}
              value={email}
              type="email"
            />

            <label className="form-label" htmlFor="phonenumber">
              Phone Number:
            </label>
            <input
              id="phonenumber"
              onChange={handleChange}
              value={phonenumber}
            />

            <label className="form-label" htmlFor="username">
              Username:
            </label>
            <input id="username" onChange={handleChange} value={username} />

            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <div id="password"></div>
            <input
              id="password"
              onChange={handleChange}
              value={password}
              type="password"
            />

            <label className="form-label" htmlFor="reenterpassword">
              Re-enter password:
            </label>
            <input
              id="reenterpassword"
              onChange={handleChange}
              value={password}
              type="password"
            />
            <div>
              <Link to="ThankYouPage">
                <button id="signupBtn">Sign Up!</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connect;
