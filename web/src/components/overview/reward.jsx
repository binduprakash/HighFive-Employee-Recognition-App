import React, {Component} from 'react';

class Reward extends Component {
    state = {
        isRead: false
    }
    redirectToHistoryPage = () => {
        this.props.history.push('/rewards_activities/received');
    }
    showRewardsModel = () => {
        this.setState({isRead: true});
        this.props.toggleShowConfetti();
    }
    render() {
        const { index, employeeId, from, to, level, reward_message, approver_message } = this.props
        return (
            <a href="javascript:void(0)" onClick={index === 0 && !this.state.isRead?  this.showRewardsModel: this.redirectToHistoryPage} style={{'text-decoration': 'none'}}>
                <div className={index === 0 && !this.state.isRead? "approval approval-active" : "approval"}>
                    <span>
                        <img alt="High 5" src= {`http://localhost:3000/award.png`} style={{height: "30px", 'margin-right': '10px'}}/>
                        {from.first_name + ' ' + from.last_name} rewarded {parseInt(employeeId) === to.id ? 'you' : to.first_name + ' ' + to.last_name} with <b>{level.points} points.</b> 
                    </span>
                </div>
            </a>
        )
    }
}

export default Reward;
