import React from 'react'
import NavBar from "./navbar.jsx"
import Form from './recognizeform.jsx';

require('../styles/navbar.css')
require('../styles/form.css')

class Recognize extends React.Component {
  render() {
    return (
      <div>
        < NavBar />
        <h1>Recognize a Co-worker!</h1>
        < Form />
      </div>
    )
  }
}
export default Recognize