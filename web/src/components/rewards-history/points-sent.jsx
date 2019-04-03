import React from 'react';

require('../../styles/history.css')


class PointsSent extends React.Component {
        
    handlePointsSentRow = () => {
    
        return (
            
            <tr data-status="active">
                <td>{this.props.receiver}</td>
                <td>{this.props.points}</td>
                <td><span className="label label-success">{this.props.status}</span></td>
                <td>{this.props.rewardMsg}</td>
                <td>{this.props.date}</td>
            </tr>
            
        )    
    }

    render () {
        return (
                <tbody>
                    {this.handlePointsSentRow()}
                </tbody>    
            )
    }
    
}

export default PointsSent