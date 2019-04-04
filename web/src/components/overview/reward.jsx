import React from 'react';

const Reward = ({ from, to, level, reward_message, approver_message }) => (
    <div className="approval">
        <p>{from.first_name + ' ' + from.last_name} gave {to.first_name + ' ' + to.last_name} {level.points} points </p>
        <p className="approval-message">{reward_message}</p>
        <p className="approval-request-message">{approver_message}</p>
    </div>
)

export default Reward;
