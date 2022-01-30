import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import pic1 from "../../images/pic1.png";
import "./navbar.css";
import UserDetails from './UserDetails'
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Nav extends React.Component {

  constructor() {
    super();

    this.state = {
      name: "",
    }
  }
  
  render() {
    return(
    <div className="nav-ctr">
      <UserDetails />

      <div className="logo-ctr">
        <img className="logo" src={logo} alt="website logo" />
      </div>

      <div className="logout-ctr">
        <button className="logout-btn">LOGOUT</button>
      </div>
    </div>
    )
  }
};

export default Nav;
