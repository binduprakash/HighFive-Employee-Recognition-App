import React from 'react'
import RedeemCart from './RedeemCart';
import RedeemReview from './RedeemReview'
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';
import { withCookies } from 'react-cookie';
import API from '../../api';

require('../../styles/navbar.css')


class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      redeemItems: []
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
    cart.push(redeemItemId.toString());
    this.setState({cart});
    const { cookies } = this.props;
    cookies.set('cart', cart.join(','));
  }
  removeFromCart = redeemItemId => {
    let cart = this.state.cart;
    cart.splice(cart.indexOf(redeemItemId.toString()), 1);
    this.setState({cart});
    const { cookies } = this.props;
    cookies.set('cart', cart.join(','));
  }
  render() {
    const childProps = {
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      cart: this.state.cart,
      redeemItems: this.state.redeemItems
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