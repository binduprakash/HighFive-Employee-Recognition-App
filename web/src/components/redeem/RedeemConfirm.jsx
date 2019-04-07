import React, { Component } from 'react';
import {Row, Col, Container, Table} from 'react-bootstrap'

require('../../styles/products.css')
require('../../styles/redeem.css')

class RecentRewards extends Component {
  render() {
    return (
      <Container>
        <Row className="order-success">
          <Col></Col>
          <Col lg={6}>
            <Table bordered>
              <tbody>
                <tr>
                  <td className="col-center">
                    <img alt="check-mart" src= {`http://localhost:3000/check-mark.png`}  style={{height: "200px", width: "160px;"}}/>
                    <br/>
                    <h5>Order has been placed successfully!</h5>
                    <p>Please check your email inbox to know further details. You have {this.props.pointsAvailable} points available.</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default RecentRewards;
