import React, { Component } from 'react';
import RedeemItems from "./redeemItems.jsx"

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
            <div>
            <header className="page-header">
              <a href="#" onClick={this.proceedToCart}><span className="myCart">My Cart({this.props.cart.length})</span></a>
            </header>
            <div className="products">
              {productListing}
            </div>
            <button onClick={this.proceedToCart}>Proceed To Checkout</button>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default RedeemCart;
