import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from '../App'

function Login() {
  let [usernameLogin, setUsernameLogin] = useState("");
  let [passwordLogin, setPasswordLogin] = useState("");
  let [submittedLogin, setSubmittedLogin] = useState(false);

  const userContext = useContext(UserContext)
  const handleChangeLogin = (event) => {
    if (event.target.id === "usernameLogin") {
      setUsernameLogin(event.target.value);
    } else{
      setPasswordLogin(event.target.value);
    }
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    userContext.userDispatch({type:'Logged In',usernameLogin})
    setSubmittedLogin((prevSubmitted) => true);
    document.getElementById('formcontainer').hidden = true;
    document.getElementById('signoutBtn').hidden = false;
  };

  function handleSubmitLogout(){
    userContext.userDispatch({type:'Logged Out'})
    document.getElementById('signoutBtn').hidden = true;
  }

  return (
    <div id="ConnectPgContainer">
    <div id='signoutBtnDiv'>
          <button hidden id="signoutBtn" onClick={()=> handleSubmitLogout()}>Logout!</button>
      </div>
      <div id="Login-Page" hidden = {false}>
        <div id="formcontainer" >
          {/*  */}
          <form onSubmit={handleSubmitLogin} >
            <h2 id='logintitle'>LOGIN</h2>
            <label className="form-label" htmlFor="usernameSignIn">
              Username:
            </label>
            <input id="usernameLogin" onChange={handleChangeLogin} value={usernameLogin} />

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
         
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default Login;
