import React from 'react'
import { Form, Button, Container, Table, Row }  from 'react-bootstrap';

class RecognizeReviewAndConfirm extends React.Component {
    onPreviousClick = () => {
        this.props.history.push('/recognize/message');
    }
    onConfirmAndSubmitClick = () => {
        this.props.submitRewards();
    }
    render() {
        const recipient = this.props.employees.find((employee)=>{
            if(employee.id == this.props.selectedRecipientId){
                return employee;
            }
        });
        const pointsLevel = this.props.pointsLevels.find((pointLevel)=>{
            if(pointLevel.id == this.props.selectPointsLevelId){
                return pointLevel;
            }
        });
        console.log(recipient);
        return (
            <Container className="step-container">
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Reward Recipient</td>
                            <td>{recipient && recipient.first_name + ' ' + recipient.last_name}</td>
                        </tr>
                        <tr>
                            <td>Reward Approver</td>
                            <td>{this.props.approver && this.props.approver.first_name + ' ' + this.props.approver.last_name}</td>
                        </tr>
                        <tr>
                            <td>Points Level</td>
                            <td>{pointsLevel && pointsLevel.level_name}</td>
                        </tr>
                        <tr>
                            <td>Message to Recipient</td>
                            <td>{this.props.messageToRecipient}</td>
                        </tr>
                        <tr>
                            <td>Message to Approver</td>
                            <td>{this.props.messageToManager}</td>
                        </tr>
                    </tbody>
                </Table>
                <Form.Group as={Row} className="step-buttons">
                    <Button variant="primary" size="lg" onClick={this.onPreviousClick} className="step-previous-button">
                        Previous
                    </Button>
                    <Button variant="success" size="lg" onClick={this.onConfirmAndSubmitClick}>
                        Confirm &amp; Submit
                    </Button>
                </Form.Group>
            </Container>
        );
    }
}

export default RecognizeReviewAndConfirm