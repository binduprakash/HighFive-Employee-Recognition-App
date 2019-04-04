import React, { Component } from 'react';

import Reward from './reward';



class RecentRewards extends Component {
  render() {
    const { rewards } = this.props;
    return (
      <div className="RecentRewards">
        {rewards.map((reward, index) => <Reward key={index} id={reward.id} from={reward.from} to={reward.to} level={reward.level} />)}
      </div>
    );
  }
}

export default RecentRewards;
