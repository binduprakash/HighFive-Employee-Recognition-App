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
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <a href="#" onClick={this.proceedToCart}>My Cart({this.props.cart.length})</a>
              </Col>
              </Row>
            <Row>
            <div className="products">
              {productListing}
            </div>
            </Row>
            <Row>
            <Col></Col>
              <Col></Col>
              <Col>
                <Button onClick={this.proceedToCart}>Proceed To Checkout</Button>
              </Col>
            </Row>
          </section>
        </main>
      </div>
    );
  }
}

export default RedeemCart;
