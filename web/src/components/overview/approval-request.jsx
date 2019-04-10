import React from 'react';
import {Button} from 'react-bootstrap';
import '../../styles/approval-request.css'

const approval = ({ id, from, to, level, reward_message, approver_message, on_approve, on_reject }) => (
    <div className="approval">
        <p><b>{from.first_name + ' ' + from.last_name}</b> recognized <b>{to.first_name + ' ' + to.last_name}</b> with {level.points} points </p>
        Message to you:<p className="approval-request-message">{approver_message}</p>
        <div className="actions">
            <Button variant="success" size='sm' onClick={(e) => { on_approve(id)}}>Approve</Button>
            <Button variant="danger" size='sm' onClick={(e) => { on_reject(id)}} style={{'margin-left': '10px'}}>Reject</Button>
        </div>
    </div>
)

export default approval;
