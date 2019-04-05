import React from 'react'
import API from '../../api';
import {Container, Col, Row, Form} from 'react-bootstrap'
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';

import RecognizeSelectRecipient from './RecognizeSelectRecipient';
import RecognizeSelectLevel from './RecognizeSelectLevel';
import RecognizeMessage from './RecognizeMessage';
import RecognizeReviewAndConfirm from './RecognizeReviewAndConfirm';

require('../../styles/recognize.css')
// import Form from './recognizeform.jsx';

// require('../../styles/form.css')

class Recognize extends React.Component {

  state = {
    employees: [],
    pointsLevels: [],
    otherEmployees: [],
    approver: null,
    selectedRecipientId: null,
    selectPointsLevelId: null,
    messageToRecipient: null,
    messageToManager: null,
  }

  componentDidMount() {
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
      API.get('employees').then(res => {
          const employees = res.data;
          this.setState({ employees });
          //find object in employees array of objects, that relates to user currently logged in
          //then setState of the manager to be used in the form POST
          let employeeObject = this.state.employees.find(x => x.id == this.props.employeeId)
          
          //Creating another array of employee objects, 
          //and filtering out current logged in user, so they don't show up in dropdown list
          let employeeToFilter = this.props.employeeId;
          const otherEmployeeList = this.state.employees.filter(function(employee) {
            return employee.id != employeeToFilter
          })
          const approver = this.state.employees.find((employee) => {
            if(employee.id === employeeObject.manager_id){
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
  render() {
    const employeeId = this.props.employeeId
    const childProps = {
      recipients: this.state.otherEmployees,
      pointsLevels: this.state.pointsLevels,
      selectedRecipientId: this.state.selectedRecipientId,
      setRecipientId: this.setRecipientId,
      selectPointsLevelId: this.state.selectPointsLevelId,
      setPointsLevel: this.setPointsLevel,
      messageToManager: this.state.messageToManager,
      setMessageToManager: this.setMessageToManager,
      messageToRecipient: this.state.messageToRecipient,
      setMessageToRecipient: this.setMessageToRecipient
    };
    return (
      <Container className="recognize-form">
        <Row>
          <Col></Col>
          <Col xs={6}>
          <Container>
            <Row>
              <Col className="select-recipient-step">1) Select Recipient</Col>
              <Col className="select-level-step">2) Select Level</Col>
              <Col className="message-step">3) Provide Message</Col>
              <Col className="review-confirm-step">4) Review &amp; Confirm</Col>
            </Row>
          </Container>
            <Form>
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