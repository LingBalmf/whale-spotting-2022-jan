import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginManager";
import "./Navbar.scss";

export const Navbar: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <nav role="navigation" aria-label="main navigation">
      <Link to="/">
        <img src="/logo.png" alt="Whale Spotting logo" />
      </Link>
      <Link to="/plantrip">
        <a className="button is-primary">Plan a Trip!</a>
      </Link>
      <div>
        {!loginContext.isLoggedIn ? (
          <div>
            <Link to="/login">
              <a className="button is-primary">Login</a>
            </Link>
          </div>
        ) : (
          <Link to="/">
            <a className="button is-primary" onClick={loginContext.logOut}>
              Logout
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};
