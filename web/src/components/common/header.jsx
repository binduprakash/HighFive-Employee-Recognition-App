import React, { Component } from 'react';

import '../../styles/navbar.css';

class Overview extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="logo">
          {/* eslint-disable react/jsx-no-target-blank */}
          <a href="/">
            <img src="../public/high_five_logo.png" alt="High-Five" />
          </a>
        </h1>
        <ul className="main-nav">
          <li>Points Available: 2,000</li>
        </ul>
      </header>
    );
  }
}

export default Overview;
