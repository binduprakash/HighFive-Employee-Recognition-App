import React, { Component } from 'react';

import ApprovalsRejections from './approvals-rejections';

class ApprovalsRejectionsHistory extends Component {
  render() {
    const { rewards } = this.props;
    return (
      <div className="ApprovalsRejectionsHistory">
        <p className="history-title"> Approvals &amp; Rejections: </p>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Points</th>
                <th>Status</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        {rewards.map((reward, index) => <ApprovalsRejections 
                key= {index} 
                id= {reward.id}
                from= {reward.from}
                to= {reward.to}
                level= {reward.level}
                status= {reward.status}
                rewardMsg= {reward.approver_message}
                date= {reward.created_at}
                />)}
        </table>
      </div>
    );
  }
}

export default ApprovalsRejectionsHistory;
