import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class HighFiveAlert extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleClose = this.handleClose.bind(this);
  
    }
  
    handleClose() {
      this.props.closeAlert();
    }
  
    render() {
      return (
        <>
          <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>High Five Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.message}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  
  export default HighFiveAlert;