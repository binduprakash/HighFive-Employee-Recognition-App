import React from 'react'
import RedeemCart from './RedeemCart';
import RedeemReview from './RedeemReview'
import RedeemConfirm from './RedeemConfirm'
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';
import { withCookies } from 'react-cookie';
import API from '../../api';
import HighFiveAlert from '../HighFiveAlert';

require('../../styles/navbar.css')


class Redeem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      redeemItems: [],
      showAlert:false,
      closeAlert:null,
      alertMessage:null,
    }
  }
  componentDidMount(){
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
      this.props.setCurrentPage('redeem');
      const { cookies } = this.props;
      if (cookies.get('cart', {path: "/"})){
        this.setState({ cart: cookies.get('cart', {path: "/"}).split(',')});
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
    
  addToCart = (redeemItemId, showAlert=true) => {
    let cart = this.state.cart;
    const redeemItem = this.state.redeemItems.find((value) => {
      if(value.id == redeemItemId){
        return value;
      }
    });
    if((this.getCartTotalPoints() + redeemItem.points) > this.props.pointsAvailable){
      this.setState({
        showAlert:true,
        alertMessage: "You don't have sufficient points to redeem this card",
      });
    } else {
      cart.push(redeemItemId.toString());
      this.setState({cart});
      if(showAlert){
        this.setState({
          showAlert:true,
          alertMessage: 'Gift Card added to your Cart!',
        });
      }
      const { cookies } = this.props;
      cookies.set('cart', cart.join(','), {path: "/"});
    }
  }
  removeFromCart = redeemItemId => {
    let cart = this.state.cart;
    cart.splice(cart.indexOf(redeemItemId.toString()), 1);
    this.setState({cart});
    const { cookies } = this.props;
    cookies.set('cart', cart.join(','), {path: "/"});
  }
  clearCart = () => {
    this.setState({cart: []});
    const { cookies } = this.props;
    cookies.set('cart', '', {path: "/"});
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

  closeAlertModel = () => {
    this.setState({showAlert:false});
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
        <HighFiveAlert 
            show={this.state.showAlert}
            closeAlert={this.closeAlertModel} 
            message={this.state.alertMessage}
        />
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