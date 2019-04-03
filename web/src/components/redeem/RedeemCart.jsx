import React, { Component } from 'react';
import RedeemItems from "./redeemItems.jsx"
import API from '../../api';

require('../../styles/products.css')

class RedeemCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redeemItems: []
        }
    }
    componentDidMount() {
        API.get('redeem_items')
        .then(res => {
            const redeemItems = res.data;
            this.setState({
            redeemItems: redeemItems
            })
        }); 
    }
    proceedToCart = () => {
        this.props.history.push("/redeem/review");
    }
  render() {
    const productList = this.state.redeemItems
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
        <h1>Redemption Page</h1>
        <main>
          <section className="products-index">
            <div>
            <header className="page-header">
              <h1>Products</h1>
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
