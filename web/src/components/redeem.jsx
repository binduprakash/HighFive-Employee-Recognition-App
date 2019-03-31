import React from 'react'
import NavBar from "./navbar.jsx"
import RedeemItems from "./redeemItems.jsx"

require('../styles/navbar.css')
require('../styles/products.css')

class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      userCount: 0
    }
  }
  render() {
    return (
      <div>
        < NavBar />
        <h1>Redemption Page</h1>
        < RedeemItems />
          
      </div>
      
    ) 
  }
}
export default Redeem;