import React, { Component } from 'react';

import PointsReceived from './points-received';

class ReceivedHistory extends Component {
  render() {
    const { rewards } = this.props;
    return (
      <div className="ReceivedHistory">
        Points Received
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Received From</th>
                <th>Points</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        {rewards.map((reward, index) => <PointsReceived 
                key= {index} 
                id= {reward.id}
                from= {reward.from}
                level= {reward.level} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />)}
        
        </table>
      </div>
    );
  }
}

export default ReceivedHistory;
