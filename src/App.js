import "./App.css";
import Sidebar from "./components/SideBar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import IntroToSearch from "./pages/IntroToSearch";
import AboutStudioGhibli from "./pages/AboutStudioGhibli";
import StudioGhibliSearch from "./pages/StudioGhibliSearch";
import AnimeNewsSearch from "./pages/AnimeNewsSearch";
import Connect from "./pages/Connect";
import ThankYouPage from "./pages/ThankYouPage";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import React, { useReducer } from "react";

export const UserContext = React.createContext();

//define reducer function to be consumed on child class
const reducer = (state, action) => {
  switch (action.type) {
    case "Logged Out":
      return {
        ...state,
        user: "Logged Out",
      };
    case "Logged In":
      return {
        ...state,
        user: "Logged in as: " + action.usernameLogin,
      };
    default:
      return state;
  }
};

//define routes
function App() {
  const [{ user }, dispatch] = useReducer(reducer, { user: "Log in" });
  return (
    <UserContext.Provider value={{ userState: user, userDispatch: dispatch }}>
      <div className="App">
        <div id="main-div">
          <div id="UserID-div">{user}</div>
          <h1 id="Project-title">ANIMATION</h1>
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" exact element={<Overview />} />
              <Route path="/AnimationProject" exact element={<Overview />} />
              <Route path="overview" exact element={<Overview />} />
              <Route path="overview/AboutUs" exact element={<AboutUs />} />
              <Route
                path="overview/AboutStudioGhibli"
                exact
                element={<AboutStudioGhibli />}
              />
              <Route path="/search" exact element={<IntroToSearch />} />
              <Route
                path="search/StudioGhibliSearch"
                exact
                element={<StudioGhibliSearch />}
              />
              <Route
                path="search/AnimeNewsSearch"
                exact
                element={<AnimeNewsSearch />}
              />
              <Route path="connect" exact element={<Connect />} />
              <Route
                path="connect/ThankYouPage"
                exact
                element={<ThankYouPage />}
              />
              <Route path="login" exact element={<Login />} />
            </Routes>
          </Router>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
