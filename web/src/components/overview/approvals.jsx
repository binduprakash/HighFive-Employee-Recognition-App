import React, { Component } from 'react';

import Reward from './approval-request';

class Approvals extends Component {
  render() {
    return (
      <div className="Approvals">
     
        <Reward giver={'Bindu'} recipient={'Maddie'} points={20} />
        <Reward giver={'Maddie'} recipient={'Tyler'} points={20} />
        <Reward giver={'Tyler'} recipient={'Maddie'} points={20} />
    
        
      </div>
    );
  }
}

export default Approvals;
