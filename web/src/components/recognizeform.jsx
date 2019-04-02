import React from 'react'
import API from '../api';

//starter code/template used from: https://codepen.io/alexdevero/pen/oBLbMb

// Create component for button
class Button extends React.Component {
    render() {
      return (
        <fieldset>
          <button
            type={this.props.type || 'button'}
            value={this.props.value || null}
          >
            {this.props.text}
          </button>
        </fieldset>
      );
    }
  };
  
  // Create component for label
  class Label extends React.Component {
    render() {
      if (this.props.hasLabel === 'true') {
        return <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
      }
    }
  }
  
  // Create component for select input
  class Select extends React.Component {
    render() {
  
      // Generate list of options from object
      const selectOptionsList = this.props.options.map((option, index) => {
      //value posted to db, text displayed in dropdown  
        return <option key={index} value={option.id}>{option.text}</option>
      });
  
      return (
        <fieldset>
          <Label
            hasLabel={this.props.hasLabel}
            htmlFor={this.props.htmlFor}
            label={this.props.label}
          />
          
          <select
            defaultValue=''
            id={this.props.htmlFor}
            name={this.props.name || null}
            required={this.props.required || null}
          >
            <option value='' disabled>Select one option</option>
  
            {selectOptionsList}
          </select>
        </fieldset>
      );
    }
  };
  
  // Create component for textarea
  class Textarea extends React.Component {
    render() {
      return (
        <fieldset>
          <Label
            hasLabel={this.props.hasLabel}
            htmlFor={this.props.htmlFor}
            label={this.props.label}
          />
  
          <textarea
            cols={this.props.cols || null}
            id={this.props.htmlFor}
            name={this.props.name || null}
            required={this.props.required || null}
            rows={this.props.rows || null}
          >
          </textarea>
        </fieldset>
      );
    }
  };
  
  // Create component for form
  class Form extends React.Component {
    state = {
      employees: [],
      pointsLevels: []
    }
    
    componentDidMount() {
      API.get('employees').then(res => {
          const employees = res.data;
          this.setState({ employees });
      })
      API.get('points_levels').then(res => {
        const pointsLevels = res.data;
        console.log("***",pointsLevels)
        this.setState({ pointsLevels });
    })
    }
    
    render() {
      //create const.js and reference in other files for deployment (NOTE)
      const API_HOST = 'http://localhost:3000';
      
      return (
        <form method='POST' action={`${API_HOST}/api/v1/rewards`}>
         <Select
            hasLabel='true'
            htmlFor='select'
            label='Select Employee to Recognize'
            options= {this.state.employees.map(employee => ({
              id: employee.id, text: " "+ employee.first_name +" "+ employee.last_name
            })
            )}
            required='true'
            name='to_employee_id'
          />
          
          <Select
            hasLabel='true'
            htmlFor='select'
            label='Select Points Level'
            options= {this.state.pointsLevels.map(level => ({
              id: level.id, text: level.level_name + " - " + level.points + " points"
            })
            )}
            required='true'
            name='level_id'
          />

          <Textarea
            hasLabel='true'
            htmlFor='textarea'
            label='Message to Employee'
            required='true'
            rows='10'
            name='reward_message'
          />
          
          <Textarea
            hasLabel='true'
            htmlFor='textarea'
            label='Message to Manager'
            required='true'
            rows='10'
            name='approver_message'
          />

          <input name='from_employee_id' type="hidden" value='1'/>
          <input name='approver_employee_id' type="hidden" value ='2' />
          
          <Button
            type='submit'
            value='submit'
            text='Send form'
          />
        </form>
      )
    }
  }
export default Form