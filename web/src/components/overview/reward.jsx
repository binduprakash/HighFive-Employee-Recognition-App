import React from 'react';

const Reward = ({ employeeId, from, to, level, reward_message, approver_message }) => (
    <div className="approval">
        <p>{from.first_name + ' ' + from.last_name} gave {parseInt(employeeId) === to.id ? 'you' : to.first_name + ' ' + to.last_name} <b>{level.points} points</b> </p>
        <p><i>Message:</i></p>
        <p className="approval-message">{reward_message}</p>
        <p className="approval-request-message">{approver_message}</p>
    </div>
)

export default Reward;
