import React, { Component } from 'react'

require('../styles/navbar.css')
require('../styles/products.css')

class RedeemItems extends React.Component {
  
  handleProduct = () => {
    return (
      <div>
        <main>
          <section className="products-index">

        <header className="page-header">
          <h1>Products</h1>
        </header>

              <div className="products">

                    
                <article className="product">
                  <header>
                    <a>
                      <img alt="Tim Horton Gift Card" src="https://img.buyatab.com/gcp/view/cards/259/2110/big/valentines-01b3d08d-6deb-4d69-bcc7-ce4b51cd43d8.png"  style={{height: "200px", width: "350px;"}}/>
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

            </section>

          </main>

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