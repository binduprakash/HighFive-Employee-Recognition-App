import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
require('../../styles/products.css')

class RecentRewards extends Component {
  render() {
    return (
      <Container>
        <Row className="order-success">
          <Col></Col>
          <Col>Order has been placed successfully!</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default RecentRewards;
