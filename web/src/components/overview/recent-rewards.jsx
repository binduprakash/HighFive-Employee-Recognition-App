import React, { Component } from 'react';

import Reward from './reward';
import RewardModel from './../RewardModel';

import '../../styles/recent-rewards.css'

class RecentRewards extends Component {
  render() {
    const { rewards, employeeId, history } = this.props;
    return (
      <div className="RecentRewards">
        <RewardModel 
            show={this.props.showConfetti}
            toggleShowConfetti={this.props.toggleShowConfetti} 
            reward={rewards[0]}
        />
        {
          rewards.length > 0 
            && 
          rewards.map((reward, index) => <Reward key={index} index={index} id={reward.id} employeeId={employeeId} from={reward.from} to={reward.to} level={reward.level} reward_message={reward.reward_message} history={this.props.history} toggleShowConfetti={this.props.toggleShowConfetti}/>) 
        }
      </div>
    );
  }
}

export default RecentRewards;
