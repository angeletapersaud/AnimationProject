import React, { useState, useContext } from "react";

import { UserContext } from "../App";

function Login() {
  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");
  let [submittedLogin, setSubmittedLogin] = useState(false);

  const userContext = useContext(UserContext);
  const handleChangeLogin = (event) => {
    if (event.target.id === "usernameLogin") {
      setUsernameLogin(event.target.value);
    } else {
      setPasswordLogin(event.target.value);
    }
  };

  //handle logout by calling dispatch with action type Loggin In
  const handleSubmitLogin = (event) => {
    event.preventDefault();

    //consume useContext hook
    userContext.userDispatch({ type: "Logged In", usernameLogin });
    setUsernameLogin("");
    setPasswordLogin("");
    setSubmittedLogin((prevSubmitted) => true);
    document.getElementById("signoutBtn").hidden = false;
  };

  //handle logout by calling dispatch  with action type Logged Out
  function handleSubmitLogout() {
    //consume useContext hook 
    userContext.userDispatch({ type: "Logged Out" });
    document.getElementById("signoutBtn").hidden = true;
  }

  return (
    <div id="LoginPgContainer">
      <div id="signoutBtnDiv">
        <button hidden id="signoutBtn" onClick={() => handleSubmitLogout()}>
          Logout!
        </button>
      </div>
      <div id="Login-Page" hidden={false}>
        <div id="formcontainer-Login">
          <form id="LoginForm" onSubmit={handleSubmitLogin}>
            <h2 id="logintitle">LOGIN</h2>
            <label className="form-label" htmlFor="usernameSignIn">
              Username:
            </label>
            <input
              id="usernameLogin"
              onChange={handleChangeLogin}
              value={usernameLogin}
            />

            <label className="form-label" htmlFor="passwordSignIn">
              Password:
            </label>
            <div id="passwordLogin"></div>
            <input
              id="passwordLogin"
              onChange={handleChangeLogin}
              value={passwordLogin}
              type="password"
            />
            <div>
              <button id="signinBtn">Login!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
