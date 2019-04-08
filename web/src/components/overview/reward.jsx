import React from 'react';

const Reward = ({ index, employeeId, from, to, level, reward_message, approver_message }) => (
    <div className={index === 0 ? "approval approval-active" : "approval"}>
        <span>
            <img alt="High 5" src= {`http://localhost:3000/award.png`} style={{height: "30px", 'margin-right': '10px'}}/>
            {from.first_name + ' ' + from.last_name} awarded {parseInt(employeeId) === to.id ? 'you' : to.first_name + ' ' + to.last_name} with <b>{level.points} points.</b> 
        </span>
    </div>
)

export default Reward;
