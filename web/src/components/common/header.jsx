import React, { Component } from 'react';

class Overview extends Component {
  
  handlePoints = () => {
    
    if (this.props.pointsAvailable !== null) {
      return (
        <p>Points Available: {this.props.pointsAvailable}| {this.props.employeeId}</p>
      )
    } 
  }

  render() {
    return (
      <div className="header">
        <h1 className="logo">
          <a href="/overview">
            <img alt="Gift Card" src= {`http://localhost:3000/high_five_logo.png`} style={{height: "50px"}}/> 
          </a>
        </h1>
        {this.handlePoints()}
      </div>
    );
  }
}

export default Overview;
