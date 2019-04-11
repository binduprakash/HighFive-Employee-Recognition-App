import React from 'react'
import API from '../../api';
import { Container, Col, Row, Form } from 'react-bootstrap'
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';
import RecognizeSelectRecipient from './RecognizeSelectRecipient';
import RecognizeSelectLevel from './RecognizeSelectLevel';
import RecognizeMessage from './RecognizeMessage';
import RecognizeReviewAndConfirm from './RecognizeReviewAndConfirm';

require('../../styles/recognize.css')

class Recognize extends React.Component {

  state = {
    employees: [],
    pointsLevels: [],
    otherEmployees: [],
    approver: null,
    fromEmployeeId: null,
    selectedRecipientId: null,
    selectPointsLevelId: null,
    messageToRecipient: null,
    messageToManager: null,
    submissionSuccessful: false
  }

  componentDidMount() {
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
      this.props.setCurrentPage('recognize');
      const employeeId = this.props.employeeId;
      
      API.get('employees').then(res => {
          const employees = res.data;
          this.setState({ employees });
          //find object in employees array of objects, that relates to user currently logged in
          //then setState of the manager to be used in the form POST
          let employeeObject = employees.find(x => x.id == employeeId);
        
          //Creating another array of employee objects, 
          //and filtering out current logged in user, so they don't show up in dropdown list
          let employeeToFilter = employeeId;
          const otherEmployeeList = employees.filter(function(employee) {
            return employee.id != employeeToFilter
          })
          const approver = employees.find((employee) => {
            if(employee.id == employeeObject.manager_id){
              return employee;
            }
          });
          //setting state for the variables determined above.
          this.setState({ 
            approver: approver,
            otherEmployees: otherEmployeeList 
          })

        })
      API.get('points_levels').then(res => {
        const pointsLevels = res.data;
        this.setState({ pointsLevels });
      })
    }
  }
  setRecipientId = (id) => {
    this.setState({selectedRecipientId: id});
  }
  setPointsLevel = (id) => {
    this.setState({selectPointsLevelId: id});
  }
  setMessageToRecipient = (message) => {
    this.setState({messageToRecipient: message});
  }
  setMessageToManager = (message) => {
    this.setState({messageToManager: message});
  }
  submitRewards = async () => {
    const response = await API.post('rewards', {
      from_employee_id: this.props.employeeId,
      to_employee_id: this.state.selectedRecipientId,
      level_id: this.state.selectPointsLevelId,
      reward_message: this.state.messageToRecipient,
      approver_message: this.state.messageToManager,
      approver_employee_id: this.state.approver && this.state.approver.id,
    });
    if(response.data['status'] === 'success'){
      this.setState({
        submissionSuccessful: true,
        selectedRecipientId: null,
        selectPointsLevelId: null,
        messageToRecipient: null,
        messageToManager: null,
      });
      alert('Rewards created successfully!');
    } else {
      alert('Some issue in creating rewards');
    }
  }
  restartSubmission = () => {
    this.setState({
      submissionSuccessful: false,
      selectedRecipientId: null,
      selectPointsLevelId: null,
      messageToRecipient: null,
      messageToManager: null,
    });
    
  }
  render() {
    const childProps = {
      recipients: this.state.otherEmployees,
      approver: this.state.approver,
      employees: this.state.employees,
      pointsLevels: this.state.pointsLevels,
      selectedRecipientId: this.state.selectedRecipientId,
      setRecipientId: this.setRecipientId,
      selectPointsLevelId: this.state.selectPointsLevelId,
      setPointsLevel: this.setPointsLevel,
      messageToManager: this.state.messageToManager,
      setMessageToManager: this.setMessageToManager,
      messageToRecipient: this.state.messageToRecipient,
      setMessageToRecipient: this.setMessageToRecipient,
      submitRewards: this.submitRewards,
      submissionSuccessful: this.state.submissionSuccessful,
      restartSubmission: this.restartSubmission
    };
    return (
      <Container className="recognize-form">
        <Row>
          <Col></Col>
          <Col xs={6}>
          <Container>
            <Row id='recognize-title'>
              <Col className="select-recipient-step">Select<br/>Recipient</Col>
              <Col className="select-level-step">Select<br/>Level</Col>
              <Col className="message-step">Provide<br/>Message</Col>
              <Col className="review-confirm-step">Review &amp;<br/>Confirm</Col>
            </Row>
          </Container>
            <Form className = "form-area">
            <Switch>
              <AppliedRoute path='/recognize/select_recepient' component={RecognizeSelectRecipient} props={childProps}/>
              <AppliedRoute path='/recognize/select_level' component={RecognizeSelectLevel} props={childProps}/>
              <AppliedRoute path='/recognize/message' component={RecognizeMessage} props={childProps}/>
              <AppliedRoute path='/recognize/review_and_confirm' component={RecognizeReviewAndConfirm} props={childProps}/>
              <Redirect from="/recognize" to="/recognize/select_recepient"/>
            </Switch>
            </Form>
          </Col>
          <Col></Col>
        </Row>
    </Container>
    )
  }
}
export default Recognize