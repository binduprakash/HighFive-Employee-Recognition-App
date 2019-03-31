import React from 'react'

require('../styles/navbar.css')
require('../styles/products.css')

class RedeemItems extends React.Component {
  render() {
    return (
      <div>
        <main class="container">
          <section class="products-index">

        <header class="page-header">
          <h1>Products</h1>
        </header>

              <div class="products">

                    
                <article class="product">
                  <header>
                    <a>
                      <img alt="Tim Horton Gift Card" src="https://img.buyatab.com/gcp/view/cards/259/2110/big/valentines-01b3d08d-6deb-4d69-bcc7-ce4b51cd43d8.png"  style={{height: "200px", width: "350px;"}}/>
                      <h4>Tim Horton's Gift Card</h4>
                    </a>  
                  </header>
                    <p class="description">
                      Banjo tousled biodiesel freegan forage lomo meggings intelligentsia. Put a bird on it xoxo dreamcatcher. Truffaut trust fund kogi viral tote bag portland semiotics knausgaard. Hammock iphone gentrify health letterpress thundercats.
                    </p>
                    <footer class="actions">
                      <form class="button_to" method="post" action="/"><button class="btn btn-primary" type="submit">
                        <i class="fa fa-shopping-cart"></i> Add
                        </button><input type="hidden" name="authenticity_token" value="9orHr20LFFUjRmjj6NkGi+jLbvIqLgKa8qSo8XBcuLgwkakZgToi2dLc9OwwLayKsZK0lDTR9W6pfAOD9aHSgA==" />
                      </form>    
                    </footer>

                    <aside class="price">
                      1,000 points
                    </aside>
                </article>

              </div>

            </section>

          </main>

      </div>
      
    )
  }
}
export default RedeemItems