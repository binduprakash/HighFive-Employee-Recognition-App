import React from 'react'
import NavBar from "./navbar.jsx"

require('../styles/navbar.css')

class Recognize extends React.Component {
  render() {
    return (
      <div>
        < NavBar />
        <h1>Recognize</h1>
      </div>
    )
  }
}
export default Recognize