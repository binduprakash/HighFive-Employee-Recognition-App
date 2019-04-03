import React from 'react'
import API from '../../api';
import PointsSent from './points-sent.jsx'
import PointsReceived from './points-received.jsx'
import PointsApproved from './points-approved.jsx'

require('../../styles/history.css')

class RewardsActivities extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rewards: []
        }
    }
    
    componentDidMount(){
        if(!this.props.isAuthenticated){
            alert('Login In');
            this.props.history.push("/login");
        } else {
            API.get('rewards').then(res => {
                const rewards = res.data;
                this.setState({ rewards: rewards });
            })
        }
    }

handle

    render() {
        const employeeId = this.props.employeeId
        const rewardsList = this.state.rewards

        const rewardsSent = rewardsList.map(reward => (
            <PointsSent 
                key= {reward.id} 
                id= {reward.id} 
                receiver= {reward.to_employee_id} 
                points= {reward.level_id} 
                status= {reward.status} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />
        ))

        const rewardsRecevied = rewardsList.map(reward => (
            <PointsReceived 
                key= {reward.id} 
                id= {reward.id} 
                receiver= {reward.to_employee_id} 
                points= {reward.level_id} 
                status= {reward.status} 
                rewardMsg= {reward.reward_message}
                date= {reward.created_at}
            />
        ))



        return (
            <div className="Rewards_Activities">
                <h1>Rewards Activities</h1>
                
                    <div className="table-wrapper">
                        <div className="btn-group" data-toggle="buttons">
                            <label className="btn btn-info active">
                                <input type="radio" name="status" value="Received" checked="checked"/> Received
                            </label>
                            <label className="btn btn-success">
                                <input type="radio" name="status" value="Sent"/> Sent
                            </label>
                            <label className="btn btn-warning">
                                <input type="radio" name="status" value="approvals"/> Approvals
                            </label>
                        </div>
                    </div>     
                
                <table className="table table-striped table-hover">
                <thead>
                    Points Sent
                    <tr>
                        <th>Receiver</th>
                        <th>Points</th>
                        <th>Status</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                 {rewardsSent}
                </table>
                
            </div>
        )
    }
}
export default RewardsActivities