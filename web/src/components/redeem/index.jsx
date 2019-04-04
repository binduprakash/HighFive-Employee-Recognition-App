import React from 'react'
import RedeemCart from './RedeemCart';
import RedeemReview from './RedeemReview'
import RedeemConfirm from './RedeemConfirm'
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
    const redeemItem = this.state.redeemItems.find((value) => {
      if(value.id == redeemItemId){
        return value;
      }
    });
    if((this.getCartTotalPoints() + redeemItem.points) > this.props.pointsAvailable){
      alert ("You don't have sufficient points to redeem this card");
    } else {
      cart.push(redeemItemId.toString());
      this.setState({cart});
      const { cookies } = this.props;
      cookies.set('cart', cart.join(','));
    }
  }
  removeFromCart = redeemItemId => {
    let cart = this.state.cart;
    cart.splice(cart.indexOf(redeemItemId.toString()), 1);
    this.setState({cart});
    const { cookies } = this.props;
    cookies.set('cart', cart.join(','));
  }
  clearCart = () => {
    this.setState({cart: []});
    const { cookies } = this.props;
    cookies.set('cart', '');
  }

  getItemAndQuantityFromCart = () => {
    const cart = this.state.cart;
    let cartQuantity = {}
    for(let i = 0;i < cart.length;i++){
      if(cartQuantity[cart[i]]){
        cartQuantity[cart[i]]+=1;
      } else {
        cartQuantity[cart[i]] = 1;
      }
    }
    return cartQuantity;
  } 

  getCartTotalPoints = () => {
    const cartQuantity = this.getItemAndQuantityFromCart();
    let totalPoints = 0;
    this.state.redeemItems.forEach(function(redeemItem){
      if(cartQuantity[redeemItem.id.toString()]){
        let quantity = cartQuantity[redeemItem.id.toString()];
        totalPoints+=(quantity * redeemItem.points);
      }
    });
    return totalPoints;
  }

  render() {
    const childProps = {
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      clearCart: this.clearCart,
      cart: this.state.cart,
      redeemItems: this.state.redeemItems,
      employeeId: this.props.employeeId,
      getItemAndQuantityFromCart: this.getItemAndQuantityFromCart,
      getCartTotalPoints: this.getCartTotalPoints
    }
    return (
      <div>
        <Switch>
          <AppliedRoute path='/redeem/cart' component={RedeemCart} props={childProps}/>
          <AppliedRoute path='/redeem/review' component={RedeemReview} props={childProps}/>
          <AppliedRoute path='/redeem/confirm' component={RedeemConfirm} props={childProps}/>
          <Redirect from="/redeem" to="/redeem/cart"/>
        </Switch>
      </div>
    )
  }
}

export default withCookies(Redeem);