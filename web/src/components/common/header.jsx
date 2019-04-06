import React, { Component } from 'react';

class Overview extends Component {
  
  handlePoints = () => {
    
    if (this.props.pointsAvailable !== null) {
      return (
        <p>Points Available: {this.props.pointsAvailable} | EMP_ID:{this.props.employeeId}</p>
      )
    } 
  }

  render() {
    return (
      <div className="header">
        <h1 className="logo">
          <a href="/overview" id="logo_high_five">
            <img alt="Gift Card" src= {`http://localhost:3000/high-five-logo.png`} style={{height: "70px"}}/> 
            <span>High Five</span>
          </a>
        </h1>
        {this.handlePoints()}
      </div>
    );
  }
}

export default Overview;
