import React from 'react'
import RedeemItems from "./redeemItems.jsx"
import API from '../api';

require('../styles/navbar.css')
require('../styles/products.css')

class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      userCount: 0,
      redeemItems: []
    }
  }

  // state = {
  //   redeemItems: []
  // }

  componentDidMount() {
    
    API.get('redeem_items')
    .then(res => {
      const redeemItems = res.data;
      this.setState({
        redeemItems: redeemItems
      })
    });
    
  }


  render() {
    const productList = this.state.redeemItems
    console.log('^^^', productList)
    
    const productListing = productList.map(product => (
      <RedeemItems key={product.id} name={product.name} description={product.description} points={product.points} image={product.image_url}/> 
    
    ))
      
    
    return (
      <div className="container">
        <h1>Redemption Page</h1>
        <main>
          <section className="products-index">
            <header className="page-header">
              <h1>Products</h1>
            </header>

            <div className="products">
              {productListing}
            </div>

          </section>
        </main>
      </div>
    )
  }
}
export default Redeem;