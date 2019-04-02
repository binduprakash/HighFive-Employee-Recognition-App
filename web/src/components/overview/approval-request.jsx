import React from 'react';

const approval = ({ giver, recipient, points }) => (
    <p className="approval">{giver} gave {recipient} {points} points </p>
)

export default approval;
