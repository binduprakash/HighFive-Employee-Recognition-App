import React from 'react';

class PointsReceived extends React.Component {

    handlePointsReceivedRow = () => {
    
        return (
            
            <tr data-status="active">
                <td>{this.props.receiver}</td>
                <td>{this.props.points}</td>
                <td>{this.props.rewardMsg}</td>
                <td>{this.props.date}</td>
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

export default PointsReceived