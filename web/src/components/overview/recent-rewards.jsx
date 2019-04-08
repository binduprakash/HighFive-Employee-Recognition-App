import React, { Component } from 'react';

import Reward from './reward';

import '../../styles/recent-rewards.css'

class RecentRewards extends Component {
  render() {
    const { rewards, employeeId } = this.props;
    return (
      <div className="RecentRewards">
        {
          rewards.length > 0 
            && 
          rewards.map((reward, index) => <Reward key={index} id={reward.id} employeeId={employeeId} from={reward.from} to={reward.to} level={reward.level} reward_message={reward.reward_message} />) 
        }
      </div>
    );
  }
}

export default RecentRewards;
