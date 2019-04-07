import React, { Component} from "react";
import {Link } from 'react-router-dom';
require('../../styles/navbar.css')

class NavBar extends Component {
    render() {
      const {showLogin, handleLogout, currentPage} = this.props;
      return (
        <div className="header_2">
          <ul className="main-nav">
            <li>
              <Link className={currentPage === 'overview' ? 'main-nav-active': 'main-nav-inactive'} to="/overview">Overview</Link>
            </li>
            <li>
              <Link className={currentPage === 'recognize' ? 'main-nav-active': 'main-nav-inactive'} to="/recognize">Recognize</Link>
            </li>
            <li>
              <Link className={currentPage === 'redeem' ? 'main-nav-active': 'main-nav-inactive'} to="/redeem">Redeem Rewards</Link>
            </li>
            <li>
              <Link className={currentPage === 'rewards_activities' ? 'main-nav-active': 'main-nav-inactive'} to="/rewards_activities">Rewards History</Link>
            </li>
            <li>
              {showLogin
                ? <Link className={currentPage === 'login' ? 'main-nav-active': 'main-nav-inactive'} to="/login" onClick={handleLogout}>Logout</Link>
                : <Link  className={currentPage === 'login' ? 'main-nav-active': 'main-nav-inactive'} to="/login">Login</Link>
              }
            </li>
          </ul>
        </div>
      );
    }
  }

  export default NavBar;