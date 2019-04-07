import React from 'react'
import {Button, Row, Col} from 'react-bootstrap';
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
              <h5 className="product-heading"> {this.props.name} </h5>
          </header>
          <Row>
            <p className="description">
              {this.props.description}
            </p>
          </Row>
          <Row>
            <Col>
              <p className="price">
                $25
              </p>
            </Col>
            <Col>
              <p className="price">
                {this.props.points} Points
              </p> 
            </Col>
          </Row>

            <footer className="actions">
              <Button variant="info" onClick={this.handleAddClick} block>Add to Cart</Button>
            </footer>
        </article>
      </div>
    )
  }
}
export default RedeemItems