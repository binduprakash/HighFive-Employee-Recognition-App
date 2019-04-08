import React, { Component } from 'react';

import ActionableReward from './approval-request';

class Approvals extends Component {
  render() {
    const { rewards, approve_request, reject_request } = this.props;
    console.log(this.props);
    return (
      <div className="Approvals">
        {
          rewards.length > 0 && rewards.map((reward, index) => <ActionableReward key={index} id={reward.id} from={reward.from} to={reward.to} level={reward.level} on_approve={approve_request} on_reject={reject_request} />)}
      </div>
    );
  }
}

export default Approvals;
