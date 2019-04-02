import React from 'react'

require('../styles/navbar.css')
require('../styles/products.css')

class RedeemItems extends React.Component {
  
  handleProduct = () => {
    return (
      <div>
        <article className="product">
          <header>
              <img alt="Gift Card" src= {`http://localhost:3000/${this.props.image}`}  style={{height: "200px", width: "350px;"}}/>
              <h4> {this.props.name} </h4>
          </header>
            <p className="description">
              {this.props.description}
            </p>
            <footer className="actions">
              <button onClick={this.props.addToCart}>
              Add</button>
            </footer>
            <p className="price">
              {this.props.points} Points
            </p> 
        </article>
      </div>
    )
  }
  
  render() {
    return (
      <div>
        {this.handleProduct()}
      </div>
    )
  }
}
export default RedeemItems