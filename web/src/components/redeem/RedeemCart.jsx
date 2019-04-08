import React, { Component } from 'react';
import RedeemItems from "./redeemItems.jsx"
import {Row, Col, Button} from 'react-bootstrap';
require('../../styles/products.css')

class RedeemCart extends Component {
    proceedToCart = () => {
        this.props.history.push("/redeem/review");
    }
  render() {
    const productList = this.props.redeemItems
    const productListing = productList.map(product => (
      <RedeemItems 
          key={product.id} 
          id={product.id} 
          name={product.name} 
          description={product.description} 
          points={product.points} 
          image={product.image_url} 
          addToCart={this.props.addToCart}
      /> 
    ))
    return (
        <div className="container">
        <main>
          <section className="products-index">
            <Row className="cart-message-row">
              <Col></Col>
              <Col>
                <a href="#" className="myCart" onClick={this.proceedToCart}>
                  <img alt="Empty-Card" src= {`http://localhost:3000/cart.ico`}  style={{height: "30px", width: "40px"}}/>
                  My Cart({this.props.cart.length})
                </a>
              </Col>
              </Row>
            <Row>
            <div className="products">
              {productListing}
            </div>
            </Row>
            <Row>
            <Col></Col>
            <Col><Button variant='success' className="add-to-cart-button" onClick={this.proceedToCart} block>Proceed To Checkout</Button></Col>
            <Col></Col>
            </Row>
          </section>
        </main>
      </div>
    );
  }
}

export default RedeemCart;
