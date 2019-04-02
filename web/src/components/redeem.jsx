import React from 'react'
import RedeemItems from "./redeemItems.jsx"
import API from '../api';

require('../styles/navbar.css')
require('../styles/products.css')

class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      redeemItems: []
    }
  }

  componentDidMount() {
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
    API.get('redeem_items')
    .then(res => {
      const redeemItems = res.data;
      this.setState({
        redeemItems: redeemItems
      })
    });
  }
    
  }
   addToCart = redeemItemId => {
    let cart = this.state.cart;
    cart.push(redeemItemId);
    this.setState({cart});
    alert("item added");
  }

  render() {
    const productList = this.state.redeemItems
    console.log('^^^', productList)
    
    
    const productListing = productList.map(product => (
      <RedeemItems key={product.id} id={product.id} name={product.name} description={product.description} points={product.points} image={product.image_url} addToCart={this.addToCart}/> 
    
    ))
      
    
    return (
      <div className="container">
        <h1>Redemption Page</h1>
        <main>
          <section className="products-index">
            <header className="page-header">
              <h1>Products</h1>
              <a href="#"><span className="myCart">My Cart({this.state.cart.length})</span></a>
              
            </header>

            <div className="products">
            
              {productListing}
            </div>
            <button>Proceed To Checkout</button>

          </section>
        </main>
      </div>
    )
  }
}
export default Redeem;