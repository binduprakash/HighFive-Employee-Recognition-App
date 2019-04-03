import React from 'react';

class PointsApproved extends React.Component {

    render() {
        return (
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Points</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr data-status="active">
                        <td>Tyler</td>
                        <td>200</td>
                        <td>Great job on the project</td>
                        <td>2019/04/12</td>
                    </tr>
                </tbody>
                </table>
        )    
    }

}

export default PointsApproved