import React, { Component } from 'react'

require('../styles/navbar.css')
require('../styles/products.css')

class RedeemItems extends React.Component {
  
  handleProduct = () => {
    return (
      <div>
        <article className="product">
          <header>
            <a>
              <img alt="Gift Card" src= {`http://localhost:3000/${this.props.image}`}  style={{height: "200px", width: "350px;"}}/>
              <h4> {this.props.name} </h4>
            </a>  
          </header>
            <p className="description">
              {this.props.description}
            </p>
            <footer className="actions">
              <form className="button_to" method="post" action="/"><button class="btn btn-primary" type="submit">
                <i className="fa fa-shopping-cart"></i> Add
                </button><input type="hidden" name="authenticity_token" value="9orHr20LFFUjRmjj6NkGi+jLbvIqLgKa8qSo8XBcuLgwkakZgToi2dLc9OwwLayKsZK0lDTR9W6pfAOD9aHSgA==" />
              </form>    
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