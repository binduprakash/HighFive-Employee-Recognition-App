import React, { Component } from 'react';
import API from '../../api';
import { Container, Row, Col, Button } from 'react-bootstrap';

require('../../styles/redeem.css')

class RedeemReview extends Component {

  getCartRows = () => {
    const handleReduceQuantityButton = event => {
      this.props.removeFromCart(event.target.id);
    } 
    const handleIncreaseQuantityButton = event => {
      this.props.addToCart(event.target.id);
    } 
    const cartQuantity = this.props.getItemAndQuantityFromCart();
    let tableRows = this.props.redeemItems.map(function(redeemItem){
      if(cartQuantity[redeemItem.id.toString()]){
        let quantity = cartQuantity[redeemItem.id.toString()];
        
        return (
          <tr>
            <td><img alt="Gift Card" src= {`http://localhost:3000/${redeemItem.image_url}`}  style={{height: "40px", width: "60px;"}}/></td>
            <td>{redeemItem.name}<br/>{redeemItem.points} Points</td>
            <td>
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
        <td colspan="2">Total Points</td>
        <td>{this.props.getCartTotalPoints()}</td>
      </tr>
    ))
    return tableRows;
  }
  payByPointsAndSubmit = async () => {
    const response =  await API.post('orders', {
      employee_id: this.props.employeeId,
      cart_details: JSON.stringify(this.props.getItemAndQuantityFromCart())
    });
    if (response.data['status'] === 'success'){
      alert('Order has been placed successfully!')
      this.props.clearCart();
      this.props.history.push("/redeem/confirm");
    } else {
      alert('Some issue while saving order, please try again later');
    }
  }

  goBackToRedeemCart = () => {
    this.props.history.push("/redeem/cart");
  }

  render() {
    return (
      <Container>
        <section className="products-index">
          <Row>
            <Col></Col>
            <Col>
            {
              this.props.getCartTotalPoints() ?
              <table>
                {this.getCartRows()}
              </table> : 
              <div>
                <h4>Your cart is empty</h4>
                <br></br>
                <button className="continue-redeem" onClick={this.goBackToRedeemCart}>Continue Redeeming</button> 
              </div> 
            }
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Button variant="secondary" onClick={this.goBackToRedeemCart}>Go Back</Button><Button variant="success" className="pay-points" disabled={!this.props.getCartTotalPoints()} onClick={this.payByPointsAndSubmit}>Pay by Points and Submit</Button> 
            </Col>
            <Col></Col>
          </Row>
        </section>
    </Container>
    );
  }
}

export default RedeemReview;
