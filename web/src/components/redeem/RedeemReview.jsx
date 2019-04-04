import React, { Component } from 'react';
require('../../styles/redeem.css')
class RedeemReview extends Component {

  getItemAndQuantityFromCart = () => {
    const cart = this.props.cart;
    let cartQuantity = {}
    for(let i=0;i<cart.length;i++){
      if(cartQuantity[cart[i]]){
        cartQuantity[cart[i]]+=1;
      } else {
        cartQuantity[cart[i]] = 1;
      }
    }
    return cartQuantity;
  } 

  getCartRows = () => {
    const handleReduceQuantityButton = event => {
      this.props.removeFromCart(event.target.id);
    } 
    const handleIncreaseQuantityButton = event => {
      this.props.addToCart(event.target.id);
    } 
    const cartQuantity = this.getItemAndQuantityFromCart();
    let totalPoints = 0;
    let tableRows = this.props.redeemItems.map(function(redeemItem){
      if(cartQuantity[redeemItem.id.toString()]){
        let quantity = cartQuantity[redeemItem.id.toString()];
        totalPoints+=(quantity * redeemItem.points);
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
        <td>{totalPoints}</td>
      </tr>
    ))
    return tableRows;
  }
  
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
            <table>
              {this.getCartRows()}
            </table>
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
