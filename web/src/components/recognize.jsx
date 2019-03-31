import React from 'react'
import API from '../api';

class Recognize extends React.Component {
  state = {
    employees: []
  }
  componentDidMount() {
    API.get('employees').then(res => {
        const employees = res.data;
        this.setState({ employees });
    })
  }
  render() {
    return (
      <div className="Recognize">
        <h1>Recognize</h1>
        <ul>
          { this.state.employees.map(employee => <li key={employee.id}>{employee.first_name},{employee.last_name} </li>)}
        </ul>
      </div>
    )
  }
}
export default Recognize