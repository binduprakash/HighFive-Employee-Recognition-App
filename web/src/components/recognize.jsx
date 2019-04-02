import React from 'react'
import API from '../api';
import Form from './recognizeform.jsx';

require('../styles/form.css')

class Recognize extends React.Component {

  componentDidMount() {
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    } else {
      API.get('employees').then(res => {
          const employees = res.data;
          this.setState({ employees });
      })
    }
  }
  render() {
    return (
      <div className="Recognize">
        <h1>Recognize a Co-Worker!</h1>
        < Form />
      </div>
    )
  }
}
export default Recognize