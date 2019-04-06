import React from 'react';

class ApprovalsRejections extends React.Component {

    handlePointsReceivedRow = () => {
    
        return (
            
            <tr data-status="active">
                <td>{this.props.from.first_name + ' ' + this.props.from.last_name}</td>
                <td>{this.props.to.first_name + ' ' + this.props.to.last_name}</td>
                <td>{this.props.level.points}</td>
                <td>{this.props.status}</td>
                <td>{this.props.rewardMsg}</td>
                <td>{new Date(this.props.date).toDateString()}</td>
            </tr>
            
        )    
    }

    render () {
        return (
            <tbody>
                {this.handlePointsReceivedRow()}
            </tbody>    
        )
    }

}

export default ApprovalsRejections