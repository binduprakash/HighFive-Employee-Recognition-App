import React from 'react';

const Reward = ({ giver, recipient, points, message }) => (
    <p className="Reward">{giver} gave {recipient} {points} points for: <br />{message}</p>
)

export default Reward;
