import React, { Component } from 'react';
import Avatar from 'react-avatar';

class Overview extends Component {
  
  handlePoints = () => {
    
    if (this.props.pointsAvailable !== null) {
      return (
        <p id="userDetails">
          <Avatar value={this.props.firstName} size="50" round={true} src={`http://localhost:3000/${this.props.imgUrl}`} />
          <br/>
          Hi {this.props.firstName}!
          <br/>
          Wallet: {this.props.pointsAvailable} points
        </p>

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
