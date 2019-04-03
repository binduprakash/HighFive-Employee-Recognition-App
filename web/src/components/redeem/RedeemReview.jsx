import React, { Component } from 'react';
class RedeemReview extends Component {
  render() {
    return (
      <div className="container">
      <h1>Review Order</h1>
      <main>
        <section className="products-index">
          <div>
          <header className="page-header">
            <h1>Products</h1>
          </header>
          <div className="products">
            Review {this.props.cart.length}
          </div>
          <button onClick={this.proceedToCart}>Pay by Points and Submit</button>
          </div>
        </section>
      </main>
    </div>
    );
  }
}

export default RedeemReview;
