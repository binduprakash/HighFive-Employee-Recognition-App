import React, { Component } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

class RewardModel extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleClose = this.handleClose.bind(this);
    
    }
  
    handleClose() {
      this.props.toggleShowConfetti();
    }
  
    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Body>
              <Row>
                <Col>
                  <img alt="Congrats" src= {`http://localhost:3000/congrats.jpg`} style={{'width': '480px'}}/>
                </Col>
              </Row>
              <Row>
                {this.props.reward && 
                  <Col style={{'text-align' : 'center', 'font-size' : '22px'}}>
                    {this.props.reward.reward_message}
                  </Col>
                }
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  
  export default RewardModel;