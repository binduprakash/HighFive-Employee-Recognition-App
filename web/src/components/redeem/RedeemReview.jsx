import React, { Component } from 'react';
import API from '../../api';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

require('../../styles/redeem.css')

class RedeemReview extends Component {
  constructor(props, context) {
    super(props, context);

    this.payByPointsAndSubmit = this.payByPointsAndSubmit.bind(this);

    this.state = {
      isLoading: false,
    };
  }
  getCartRows = () => {
    const handleReduceQuantityButton = event => {
      this.props.removeFromCart(event.target.id);
    } 
    const handleIncreaseQuantityButton = event => {
      this.props.addToCart(event.target.id, false);
    } 
    const cartQuantity = this.props.getItemAndQuantityFromCart();
    let tableRows = this.props.redeemItems.map(function(redeemItem){
      if(cartQuantity[redeemItem.id.toString()]){
        let quantity = cartQuantity[redeemItem.id.toString()];
        
        return (
          <tr>
            <td><img alt="Gift Card" src= {`http://localhost:3000/${redeemItem.image_url}`}  style={{height: "40px", width: "60px"}}/></td>
            <td width="50%">
              <h5>{redeemItem.name}</h5>{redeemItem.points} Points | $50
            </td>
            <td className="increase-decrease-col" width="30%">
            <button id={redeemItem.id} className="cartButton" onClick={handleReduceQuantityButton}>-</button>
            {quantity}
            <button id={redeemItem.id} className="cartButton" onClick={handleIncreaseQuantityButton}>+</button>
            </td>
          </tr>
        )
      }
    });
    tableRows.push((
      <tr>
        <td class="total-point-col" colspan="2">Total Points</td>
        <td className="col-center">{this.props.getCartTotalPoints()}</td>
      </tr>
    ))
    return tableRows;
  }
  payByPointsAndSubmit = async () => {
    this.setState({isLoading: true});
    const response =  await API.post('orders', {
      employee_id: this.props.employeeId,
      cart_details: JSON.stringify(this.props.getItemAndQuantityFromCart())
    });
    this.setState({isLoading: false});
    if (response.data['status'] === 'success'){
      this.props.clearCart();
      this.props.refreshEmployeesAndRewards(true, this.props.employeeId);
      this.props.history.push("/redeem/confirm");
    } else {
      alert('Some issue while saving the order, please try again later');
    }
  }

  goBackToRedeemCart = () => {
    this.props.history.push("/redeem/cart");
  }
  render() {
    const { isLoading } = this.state;
    return (
      <Container>
        <section className="products-index">
          <Row className="redeem-review-container">
            <Col></Col>
            <Col lg={6}>
            {
              this.props.getCartTotalPoints() ?
              <Table striped bordered hover>
                <tbody>
                  {this.getCartRows()}
                </tbody>
              </Table> : 
              <Table bordered>
                <tbody>
                  <tr>
                    <td className="empty-cart-container">
                      <img alt="Empty-Card" src= {`http://localhost:3000/empty-cart.png`}  style={{height: "200px", width: "160px"}}/>
                      <br/>
                      <h5>Your cart is empty.</h5>
                    </td>
                  </tr>
                </tbody>
              </Table>
            }
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col lg={6} className="col-center">
              <Button variant="danger" onClick={this.props.clearCart}>Clear Cart</Button>
              <Button variant="secondary" className="pay-points" onClick={this.goBackToRedeemCart}>Go Back</Button>
              <Button variant="success" className="pay-points" disabled={isLoading || !this.props.getCartTotalPoints()} onClick={!isLoading ? this.payByPointsAndSubmit : null}>
                {isLoading ? 'Paying...' : 'Pay by Points and Submit'}
              </Button> 
            </Col>
            <Col></Col>
          </Row>
        </section>
    </Container>
    );
  }
}

export default RedeemReview;
