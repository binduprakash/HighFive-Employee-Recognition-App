import React from 'react'
import {Button} from 'react-bootstrap';
require('../../styles/navbar.css')
require('../../styles/products.css')

class RedeemItems extends React.Component {
  
  handleAddClick = () => {
    this.props.addToCart(this.props.id)
  }
  render() {
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
            <p className="price">
              {this.props.points} Points
            </p> 
            <footer className="actions">
              <Button variant="info" onClick={this.handleAddClick}>Add to Cart</Button>
            </footer>
        </article>
      </div>
    )
  }
}
export default RedeemItems