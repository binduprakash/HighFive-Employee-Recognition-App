import React, { Component } from 'react';

import Reward from './reward';



class RecentRewards extends Component {
  render() {
    return (
      <div className="RecentRewards">
        <Reward giver={'Bindu'} recipient={'Maddie'} points={20} message={'Great job on the High-Five project'} />
        <Reward giver={'Maddie'} recipient={'Tyler'} points={20} message={'Great job on the High-Five project'} />
        <Reward giver={'Tyler'} recipient={'Maddie'} points={20} message={'Great job on the High-Five project'} />
      </div>
    );
  }
}

export default RecentRewards;
