import React, { Component } from 'react';
import NavBar from "./navbar.jsx"

require('../styles/navbar.css')

class Overview extends Component {
  render() {
    return (
      <div className="App">
        < NavBar />
        <h1>Overview</h1>
      </div>
    );
  }
}

export default Overview;
