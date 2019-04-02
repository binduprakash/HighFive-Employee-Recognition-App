import React, { Component } from 'react';

class Overview extends Component {
  
  render() {
    return (
      <div className="header">
        <h1>High Five</h1>
        <p>{this.props.employeeId} {this.props.pointsAvailable}</p>
      </div>
    );
  }
}

export default Overview;
