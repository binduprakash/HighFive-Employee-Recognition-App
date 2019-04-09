import React, { Component } from 'react';

import PointsSent from './points-sent';

class SentHistory extends Component {
  render() {
    const { rewards } = this.props;
    return (
      <div className="SentHistory">
        <p className="history-title"> Points Sent: </p>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Sent to</th>
                <th>Points</th>
                <th>Status</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        {rewards.map((reward, index) => <PointsSent 
                key= {index} 
                id= {reward.id}
                to= {reward.to}
                status= {reward.status}
                level= {reward.level} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />)}
        </table>
      </div>
    );
  }
}

export default SentHistory;
