import React from 'react'
import RedeemCart from './RedeemCart';
import RedeemReview from './RedeemReview'
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';
import { withCookies } from 'react-cookie';

require('../../styles/navbar.css')


class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    }
  }
  componentDidMount(){
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
      const { cookies } = this.props;
      if (cookies.get('cart')){
        this.setState({ cart: cookies.get('cart').split(',')});
      }
    }
  }
    
   addToCart = redeemItemId => {
    let cart = this.state.cart;
    cart.push(redeemItemId.toString());
    this.setState({cart});
    const { cookies } = this.props;
    cookies.set('cart', cart.join(','));
    alert("item added");
  }
  render() {
    const childProps = {
      addToCart: this.addToCart,
      cart: this.state.cart
    }
    return (
      <div>
        <Switch>
          <AppliedRoute path='/redeem/cart' component={RedeemCart} props={childProps}/>
          <AppliedRoute path='/redeem/review' component={RedeemReview} props={childProps}/>
          <Redirect from="/redeem" to="/redeem/cart"/>
        </Switch>
      </div>
    )
  }
}

export default withCookies(Redeem);