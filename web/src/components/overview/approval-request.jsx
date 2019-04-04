import React from 'react';

import '../../styles/approval-request.css'

const approval = ({ id, from, to, level, reward_message, approver_message, on_approve, on_reject }) => (
    <div className="approval">
        <p>{from.first_name + ' ' + from.last_name} gave {to.first_name + ' ' + to.last_name} {level.points} points </p>
        <p className="approval-message">{reward_message}</p>
        <p className="approval-request-message">{approver_message}</p>
        <div className="actions">
            <a href="javascript:void(0)" className="primary" onClick={(e) => { on_approve(id)}}>Approve</a>
            <a href="javascript:void(0)" className="secondary" onClick={(e) => { on_reject(id)}}>Reject</a>
        </div>
    </div>
)

export default approval;
